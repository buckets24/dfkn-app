import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Amplify, { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import config from 'src/AmplifyConfig';
import { ROLES } from 'src/API';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { requestAgentBySub } from '../agentService';
import { AgentPublicModel } from '../api/AgentModel';

const getAgentByIdHandler: RequestHandler<NextApiRequest, NextApiResponse<AgentPublicModel | SimpleError>> = async (
  req,
  res
) => {
  Amplify.configure({
    ...config,
    aws_appsync_authenticationType: 'API_KEY',
  });

  const { Auth, API } = withSSRContext({ req });
  const { query } = req;

  const agentId = query.agentId;

  try {
    if (typeof agentId !== 'string') {
      const errorCode = log(LogLevel.error, 'MALFORMED_AGENT_ID', {
        label: 'getAgentByIdHandler',
        message: 'The id passed to getAgentByIdHandler is not a string',
      });
      res.status(400).json({
        type: 'MALFORMED_AGENT_ID',
        message: 'The id passed to getAgentByIdHandler is not a string',
        errorCode,
      });
      return;
    }

    if (!(Auth instanceof AuthClass)) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'getAgentByIdHandler',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      });
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        errorCode,
      });
      return;
    }

    const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
    /**
     * Handle Admin is accessing getAgent
     */
    if (await hasCognitoGroup(cognitoUser, ROLES.Admin)) {
      /**
       * TODO This use case doesn't really make sense since the Admin can
       * straight away request the agent client/server side just by using
       * the API normally. But to keep things clear I will leave this empty
       * if block
       */
      const errorCode = log(LogLevel.error, 'UNFINISHED_ENDPOINT', {
        label: 'getAgentByIdHandler',
        message: 'The endpoint you are attempting to call has not been coded completely.',
      });
      res.status(500).json({
        type: 'UNFINISHED_ENDPOINT',
        message: 'The endpoint you are attempting to call has not been coded completely.',
        errorCode,
      });
    }

    if (await hasCognitoGroup(cognitoUser, ROLES.Client)) {
      log(LogLevel.info, 'REQUESTING_AGENT', {
        label: 'getAgentByIdHandler',
        message: 'Requesting agent by id',
      });
      const agent = await requestAgentBySub(agentId, API);
      if (agent) {
        const { id, email, firstName, lastName, sub, salutation, role } = agent;
        res.status(200).json({
          id,
          email,
          firstName,
          lastName,
          sub,
          salutation,
          role,
        });
        return;
      } else {
        const errorCode = log(LogLevel.error, 'NOT_FOUND', {
          label: 'getAgentByIdHandler',
          message: `We could not find an agent with a id of : ${agentId}`,
        });
        res.status(404).json({
          type: 'NOT_FOUND',
          message: `We could not find an agent with a id of : ${agentId}`,
          errorCode,
        });
        return;
      }
    }

    const errorCode = log(LogLevel.error, 'USER_ROLE_NOT_AUTHORIZED', {
      label: 'getAgentByIdHandler',
      message: `The roles of the user ${cognitoUser.getUsername()} does not have any handled roles in getAgentByIdHandler`,
    });
    res.status(401).json({
      type: 'USER_ROLE_NOT_AUTHORIZED',
      message: `The roles of the user ${cognitoUser.getUsername()} does not have any handled roles in getAgentByIdHandler`,
      errorCode,
    });
    return;
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'GetAgentBySubHandler',
      ...e,
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      errorCode,
      ...e,
    });
  }
};

export default getAgentByIdHandler;
