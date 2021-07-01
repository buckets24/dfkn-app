import { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { DeleteAgentModelMutation } from 'src/API';
import { deleteAgent, requestAgentById } from 'src/modules/agent/agentService';
import { deleteCognitoUser } from 'src/modules/auth/cognitoService';
import { requestClientsByOwner } from 'src/modules/client/clientService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { PromiseValue } from 'type-fest';

export type DeleteAgentByIdHandlerResponse = NonNullable<DeleteAgentModelMutation['deleteAgentModel']>;

const deleteAgentbyIdHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<DeleteAgentByIdHandlerResponse | SimpleError>
> = async (req, res) => {
  const { API } = withSSRContext({ req });
  const { query } = req;
  const { agentId } = query;

  if (typeof agentId !== 'string') {
    const errorCode = log(LogLevel.error, 'INVALID_ID', {
      label: 'DeleteAgentByIdHandler',
      message: 'Error deleting agent, id is not a string',
    });
    res.status(500).json({
      type: 'INVALID_ID',
      message: 'Error deleting agent, id is not a string',
      errorCode,
    });
    return;
  }

  /**
   * WARNING THERE IS NO ROLLING BACK FOR THIS OPERATION.
   * Once partially deleted, AgentModel/CognitoUser it is
   * no longer usable
   */

  let agent: PromiseValue<ReturnType<typeof requestAgentById>>;
  let clients: PromiseValue<ReturnType<typeof requestClientsByOwner>>;

  try {
    log(LogLevel.info, 'REQUESTING_AGENT', {
      label: 'DeleteAgentByIdHandler',
      message: 'Requesting an agent by id',
    });
    agent = await requestAgentById(agentId, API);
    if (agent) {
    } else {
      throw new Error('Could not find agent');
      return;
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'DELETE_AGENT_NOT_FOUND', {
      label: 'DeleteAgentByIdHandler',
      message: `The agent with the id ${agentId} was not found`,
    });
    res.status(404).json({
      type: 'DELETE_AGENT_NOT_FOUND',
      message: `The agent with the id ${agentId} was not found`,
      errorCode,
    });
    return;
  }

  /**
   * Attempt to check clients by owner
   */
  try {
    if (agent.sub) {
      log(LogLevel.info, 'REQUESTING_AGENTS_CLIENTS', {
        label: 'DeleteAgentByIdHandler',
        message: 'Requesting clients by owner',
      });
      const clientResponse = await requestClientsByOwner({ owner: agent.sub }, API);
      const clients = clientResponse?.items;

      /**
       * TODO Handle next token, but might not need to
       * if we have batch resolvers
       */

      if (clients?.length !== undefined && clients.length > 0) {
        const errorCode = log(LogLevel.error, 'DELETE_FAILED_AGENT_HAS_CLIENTS', {
          label: 'DeleteAgentByIdHandler',
          message: `Can't delete agent since he/she has clients. Please re-assign the clients first`,
        });
        res.status(400).json({
          type: `DELETE_FAILED_AGENT_HAS_CLIENTS`,
          message: `Can't delete agent since he/she has clients. Please re-assign the clients first`,
          errorCode,
        });
        return;
      }
    }
    /**
     * TODO Handle nexttoken of clients
     */
  } catch (e) {
    log(LogLevel.error, e.message, e);
  }

  /**
   * Delete cognito user only when there are no clients.
   * Note that this will only run if the agent has no clients
   * under the sub
   */
  try {
    log(LogLevel.info, 'DELETING_AGENT_COGNITO', {
      label: 'DeleteAgentByIdHandler',
      message: 'Deleting the agent in Cognito',
    });
    await deleteCognitoUser(agent.email);
  } catch (e) {
    log(
      LogLevel.warn,
      e.message ??
        `deleteCognitoUser() failed, no such user but we will proceed with deleting the AgentModel ${agent.email}`,
      e
    );
  }

  /**
   * Final step, delete the agent
   */
  try {
    log(LogLevel.info, 'DELETING_AGENT_DYNAMODB', {
      label: 'DeleteAgentByIdHandler',
      message: 'Deleting the agent in DynamoDB',
    });
    const deletedAgent = await deleteAgent(agent.id, API);
    if (deletedAgent) {
      res.status(201).json(deletedAgent);
    } else {
      const errorCode = log(LogLevel.warn, 'DELETE_AGENT_SUCCEEDED_BUT_NO_AGENT', {
        label: 'DeleteAgentByIdHandler',
        message: 'For some reason deleteAgent ended without returning an agent',
      });
      res.status(201).json({
        type: 'DELETE_AGENT_SUCCEEDED_BUT_NO_AGENT',
        message: 'For some reason deleteAgent ended without returning an agent',
        errorCode,
      });
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, e.message ?? 'deleteAgent() in deleteAgentbyIdHandler failed', e);
    res.status(500).json({
      type: 'FAILED_TO_DELETE_AGENT_MODEL',
      message: `An error was thrown when deleting the agent model with id: ${agent.id} name: ${agent.firstName} ${agent.lastName}`,
      errorCode,
    });
  }
};

export default deleteAgentbyIdHandler;
