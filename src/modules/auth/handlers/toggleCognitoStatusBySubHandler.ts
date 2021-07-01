import { APIClass, withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { AccountStatus } from 'src/API';
import { requestAgentBySub, updateAgentStatus } from 'src/modules/agent/agentService';
import { requestClientBySub, updateClientStatus } from 'src/modules/client/clientService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { PromiseValue } from 'type-fest';
import { disableCognitoUserByEmailOrSub, enableCognitoUserByEmailOrSub } from '../cognitoService';

export type ToggleCognitoStatusBySubHandlerResponse = 'SUCCESS';

const toggleCognitoStatusBySubHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<ToggleCognitoStatusBySubHandlerResponse | SimpleError>
> = async (req, res) => {
  const { API } = withSSRContext({ req });
  const sub = req.query.sub;
  const setStatusTo = req.body.setStatusTo;

  if (typeof sub !== 'string') {
    const errorCode = log(LogLevel.error, 'MALFORMED_SUB', {
      label: 'toggleCognitoStatusBySubHandler',
      message: 'The endpoint was called with an invalid sub',
    });
    res.status(400).json({
      type: 'MALFORMED_SUB',
      message: 'The endpoint was called with an invalid sub',
      errorCode,
    });
    return;
  }

  if (!(API instanceof APIClass)) {
    const errorCode = log(LogLevel.error, 'NOT_GRAPHQL_API_CLASS', {
      label: 'toggleCognitoStatusBySubHandler',
      message:
        'withSSRContext returned an object that is not a GraphQLAPIClass. Might need to use the deprecated APIClass',
    });
    res.status(500).json({
      type: 'NOT_GRAPHQL_API_CLASS',
      message:
        'withSSRContext returned an object that is not a GraphQLAPIClass. Might need to use the deprecated APIClass',
      errorCode,
    });
    return;
  }

  try {
    let user:
      | PromiseValue<ReturnType<typeof requestClientBySub>>
      | PromiseValue<ReturnType<typeof requestAgentBySub>>
      | undefined = undefined;

    let userType: 'CLIENT' | 'AGENT' | undefined = undefined;
    user = await requestClientBySub(sub, API);
    userType = 'CLIENT';
    if (!user) {
      user = await requestAgentBySub(sub, API);
      userType = 'AGENT';
    }
    if (!user) {
      userType = undefined;
      throw new Error(`Cannot find user account with sub: ${sub}`);
    }

    if (setStatusTo === false) {
      await disableCognitoUserByEmailOrSub(sub);
      if (userType === 'AGENT') {
        await updateAgentStatus(user.id, AccountStatus.DISABLED, API);
      } else {
        await updateClientStatus(user.id, AccountStatus.DISABLED, API);
      }
    } else {
      await enableCognitoUserByEmailOrSub(sub);
      if (userType === 'AGENT') {
        await updateAgentStatus(user.id, AccountStatus.ENABLED, API);
      } else {
        await updateClientStatus(user.id, AccountStatus.ENABLED, API);
      }
    }
    res.status(200).json('SUCCESS');
    return;
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_TOGGLE_COGNITO_USER_STATUS', {
      label: 'toggleCognitoStatusBySubHandler',
      message: `Failed to toggle the cognito user status with sub: ${sub}`,
    });
    res.status(500).json({
      type: 'FAILED_TO_TOGGLE_COGNITO_USER_STATUS',
      message: `Failed to toggle the cognito user status with sub: ${sub}`,
      errorCode,
    });
  }
};

export default toggleCognitoStatusBySubHandler;
