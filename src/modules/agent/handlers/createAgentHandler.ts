import { withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { GetAgentModelQuery } from 'src/API';
import {
  addUserToCognitoGroup,
  createCognitoUser,
  deleteCognitoUser,
  setTemporaryPassword,
} from 'src/modules/auth/cognitoService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { PromiseValue } from 'type-fest';
import { createAgent, deleteAgent, updateAgent } from '../agentService';
import { agentEditFormYupSchema, AgentModelForm } from '../api/AgentModel';
import { log, LogLevel, responseErrorWithLogger } from 'jexity-app/utils/logger';
import { generatePassword } from 'jexity-app/utils/generatePassword';
import { sendEmail } from 'jexity-app/utils/emailClient';
import ReactDOMServer from 'react-dom/server';
import ResetPasswordEmail from 'src/modules/auth/handlers/ResetPasswordEmail';

const createAgentHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<NonNullable<GetAgentModelQuery['getAgentModel']> | SimpleError>
> = async (req, res) => {
  const { body } = req;
  const { API } = withSSRContext({ req });

  const rollbacks: { identifier: string; cb: () => Promise<void> }[] = [];
  const fireRollbacks = async () => {
    for (let x = 0; x < rollbacks.length; x++) {
      const roll = rollbacks[x];
      // eslint-disable-next-line no-console
      try {
        await roll.cb();
      } catch (e) {
        log(LogLevel.error, e.message, e);
      }
    }
  };

  /**
   * Verify the input body
   */
  if (!(await agentEditFormYupSchema.isValid(body))) {
    const errorCode = log(LogLevel.error, 'INVALID_FORM_INPUT', {
      label: 'CreateAgentHandler',
      message: 'The json body sent to the server was incorrect, refer to guard isCreateAgentModelInput',
    });
    res.status(400).json({
      type: 'INVALID_FORM_INPUT',
      message: 'The json body sent to the server was incorrect, refer to guard isCreateAgentModelInput',
      errorCode,
    });
    return;
  }

  const agentModelInput = body as AgentModelForm;

  let createdAgent: PromiseValue<ReturnType<typeof createAgent>>;
  let createdCognitoUser: PromiseValue<ReturnType<typeof createCognitoUser>>;
  let updatedAgent: PromiseValue<ReturnType<typeof updateAgent>>;
  const password = generatePassword();

  /**
   * Create an AgentModel in dynamo without a sub
   */
  try {
    log(LogLevel.info, 'CREATING_AGENT_TO_DYNAMODB', {
      label: 'CreateAgentHandler',
      message: 'Creating agent to DynamoDB',
    });
    createdAgent = await createAgent(agentModelInput, API);
    if (createdAgent) {
      const id = createdAgent.id;
      rollbacks.push({
        identifier: `Rolling back createAgent with id: ${id}`,
        cb: async () => {
          await deleteAgent(id, API);
        },
      });
    } else {
      throw new Error('createAgent returned an empty cognitoUser for some reason');
    }
  } catch (e) {
    await fireRollbacks();
    const errorCode = log(LogLevel.error, 'FAILED_TO_CREATE_AGENT_MODEL', {
      label: 'CreateAgentHandler',
      message: e.message ?? 'Something went wrong when calling createAgent in createAgentHandler',
      ...e,
    });
    res.status(500).json({
      type: 'FAILED_TO_CREATE_AGENT_MODEL',
      message: e.message ?? 'Something went wrong when calling createAgent in createAgentHandler',
      errorCode,
    });
    return;
  }

  /**
   * Create the cognito user
   */
  try {
    /**
     * CREATION OF PASSWORD
     */

    const email = createdAgent.email;
    log(LogLevel.info, 'CREATING_USER_TO_COGNITO', {
      label: 'CreateAgentHandler',
      message: 'Creating agent user to Cognito',
    });
    createdCognitoUser = await createCognitoUser(email, password);
    if (createdCognitoUser) {
      rollbacks.push({
        identifier: `Rolling back created cognito user with sub: ${createdCognitoUser.Username}`,
        cb: async () => {
          await deleteCognitoUser(email);
        },
      });
    } else {
      throw new Error('createCognitoUser returned an empty sub');
    }
    if (!createdCognitoUser.Username) {
      const errorCode = log(LogLevel.error, 'COGNITO_RETURNED_A_NULL_USERNAME', {
        label: 'CreateAgentHandler',
        message: 'The adminCreateUser resolved but did not contain the cognito user object with the username',
      });
      res.status(500).json({
        type: 'COGNITO_RETURNED_A_NULL_USERNAME',
        message: 'The adminCreateUser resolved but did not contain the cognito user object with the username',
        errorCode,
      });
      return;
    }
    log(LogLevel.info, 'ADDING_USER_TO_GROUP', {
      label: 'CreateAgentHandler',
      message: 'Adding the created agent user to cognito group',
    });
    await addUserToCognitoGroup(createdCognitoUser.Username, agentModelInput.role);
  } catch (e) {
    await fireRollbacks();
    const errorCode = log(LogLevel.error, 'FAILED_TO_CREATE_COGNITO_USER', {
      label: 'CreateAgentHandler',
      message: e.message ?? 'Something went wrong when calling createCognitoUser in createAgentHandler',
    });
    res.status(500).json({
      type: 'FAILED_TO_CREATE_COGNITO_USER',
      message: e.message ?? 'Something went wrong when calling createCognitoUser in createAgentHandler',
      errorCode,
    });
    return;
  }

  /**
   * Update the existing AgentModel with the new sub
   */
  try {
    if (createdCognitoUser.Username) {
      log(LogLevel.info, 'UPDATING_EXISTING_AGENT', {
        label: 'CreateAgentHandler',
        message: 'Updating existing agent with the new sub',
      });
      updatedAgent = await updateAgent(
        {
          id: createdAgent.id,
          sub: createdCognitoUser.Username,
        },
        API
      );
      if (updatedAgent) {
        /**
         * Can't really rollback an update can we.
         * If it failed then it is already in the correct
         * state
         */
      }
    }
  } catch (e) {
    await fireRollbacks();
    const errorCode = log(LogLevel.error, 'FAILED_TO_UPDATE_COGNITO_USER', {
      label: 'CreateAgentHandler',
      message:
        e.message ??
        'Something went wrong when calling updateAgent in createAgentHandler. We failed to insert the new sub, rollbacks have also been fired',
    });
    res.status(500).json({
      type: 'FAILED_TO_UPDATE_COGNITO_USER',
      message:
        e.message ??
        'Something went wrong when calling updateAgent in createAgentHandler. We failed to insert the new sub, rollbacks have also been fired',
      errorCode,
    });
    return;
  }

  /**
   * Send the password to the agent
   */
  try {
    const password = generatePassword();
    await setTemporaryPassword(createdAgent.email, password);
    const { salutation, firstName, lastName, email } = createdAgent;

    const emailBody = ReactDOMServer.renderToString(
      ResetPasswordEmail(salutation, firstName, lastName, email, password)
    );

    await sendEmail({
      html: emailBody,
      subject: 'Ihre Zugangsdaten für Nessy Cloud by DFK Nord AG',
      text: emailBody,
      to: createdAgent.email,
    });
  } catch (e) {
    responseErrorWithLogger(res, {
      status: 400,
      label: 'createAgentHandler',
      message:
        e.message ??
        'Failed to send temporary email to agent, but he/she has been created. Please resend the password.',
      type: 'FAILED_TO_SEND_TEMPORARY_PASSWORD',
    });
  }

  res.status(200).json(createdAgent);
  log(LogLevel.info, 'SUCCESSFULLY_CREATED_THE_AGENT', {
    label: 'CreateAgentHandler',
    message: 'The creation of the agent user was successful.',
  });
};

export default createAgentHandler;
