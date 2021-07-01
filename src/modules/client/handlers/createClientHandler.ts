import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { CognitoUserStatusType, CreateClientModelInput, CreateClientModelMutation } from 'src/API';
import {
  addUserToCognitoGroup,
  createCognitoUser,
  getCognitoGroup,
  getUserFromCognito,
} from 'src/modules/auth/cognitoService';
import { isSimpleError, SimpleError } from 'src/utils/type-utils/SimpleError';
import { ClientEditFormValues, clientEditFormYupSchema } from '../api/ClientModel';
import { createClient, publicRequestClientBySub } from '../clientService';
import { publicRequestAgentByEmail } from 'src/modules/agent/agentService';

export type CreateClientResponse = NonNullable<CreateClientModelMutation['createClientModel']>;
export type CreateClientError = SimpleError;

const createClientHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<CreateClientResponse | CreateClientError>
> = async (req, res) => {
  const { API, Auth } = withSSRContext({ req });
  const { body } = req;

  if (!(Auth instanceof AuthClass)) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'CreateClientHandler',
      message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      errorCode,
    });
    return;
  }

  if (!(await clientEditFormYupSchema.isValid(body))) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'CreateClientHandler',
      message: 'The json body sent to the server was incorrect, refer to validation schema clientEditFormYupSchema',
    });
    res.status(400).json({
      type: 'Invalid form input',
      message: 'The json body sent to the server was incorrect, refer to validation schema clientEditFormYupSchema',
      errorCode,
    });
    return;
  }

  const agentUser: CognitoUser = await Auth.currentAuthenticatedUser();
  const clientFormValues = body as ClientEditFormValues;
  const { email } = clientFormValues;

  try {
    const cognitoUser = await getUserFromCognito(email);

    if (cognitoUser) {
      const sub = cognitoUser.Username;
      if (!sub) {
        const errorCode = log(LogLevel.error, 'COGNITO_RETURNED_A_NULL_USERNAME', {
          label: 'CreateClientHandler',
          message: 'The adminGetUser resolved but did not contain the cognito user object with the username',
        });
        res.status(500).json({
          type: 'COGNITO_RETURNED_A_NULL_USERNAME',
          message: 'The adminGetUser resolved but did not contain the cognito user object with the username',
          errorCode,
        });
        return;
      }

      const cognitoUserGroup = await getCognitoGroup(sub);
      if (cognitoUserGroup?.includes('Admin')) {
        const errorCode = log(LogLevel.error, 'ADMIN_CANNOT_CREATE_CLIENTS', {
          label: 'CreateClientHandler',
          message: 'User with admin role/group cannot create a client',
        });
        res.status(400).json({
          type: 'ADMIN_CANNOT_CREATE_CLIENTS',
          message: 'User with admin role/group cannot create a client',
          errorCode,
        });
        return;
      }

      const agentList = await publicRequestAgentByEmail(email);

      if (agentList && agentList.length > 0) {
        const errorCode = log(LogLevel.error, 'EMAIL_IN_USE', {
          label: 'CreateClientHandler',
          message: 'The email is used by an agent model',
        });
        res.status(400).json({
          type: 'EMAIL_IN_USE',
          message: 'The email is used by an agent model',
          errorCode,
        });
        return;
      }

      log(LogLevel.info, 'REQUESTING_CLIENT', {
        label: 'CreateClientHandler',
        message: 'Requesting client by sub',
      });

      const client = await publicRequestClientBySub(sub);
      if (client) {
        const errorCode = log(LogLevel.error, 'USER_EXIST', {
          label: 'CreateClientHandler',
          message: 'The user already exist in DynamoDB',
        });
        res.status(400).json({
          type: 'USER_EXIST',
          message: 'The user already exist in DynamoDB',
          errorCode,
        });
        return;
      }

      const createClientInput: CreateClientModelInput = {
        ...clientFormValues,
        cognitoStatus: cognitoUser.UserStatus as CognitoUserStatusType,
        sub: sub,
        owner: agentUser.getUsername(),
      };
      log(LogLevel.info, 'CREATING_CLIENT', {
        label: 'CreateClientHandler',
        message: 'Creating client in DynamoDB',
      });
      const createdClient = await createClient(createClientInput, API);
      if (!createdClient) {
        const errorCode = log(LogLevel.error, 'FAILED_TO_CREATE_CLIENT_MODEL', {
          label: 'CreateClientHandler',
          message: `Something went wrong while saving the client to the database - cognito user sub: ${sub}`,
        });
        res.status(500).json({
          type: `FAILED_TO_CREATE_CLIENT_MODEL`,
          message: `Something went wrong while saving the client to the database - cognito user sub: ${sub}`,
          errorCode,
        });
        return;
      }

      res.status(200).json(createdClient);
    } else {
      const createdCognitoUser = await createCognitoUser(email);
      log(LogLevel.info, 'CREATING_CLIENT', {
        label: 'CreateClientHandler',
        message: 'Creating client in Cognito',
      });
      if (!createdCognitoUser || !createdCognitoUser.Username) {
        const errorCode = log(LogLevel.error, 'COGNITO_RETURNED_A_NULL_USERNAME', {
          label: 'CreateClientHandler',
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
        label: 'CreateClientHandler',
        message: 'Adding the created client user to cognito group',
      });
      await addUserToCognitoGroup(createdCognitoUser.Username, 'Client');
      const createClientInput: CreateClientModelInput = {
        ...clientFormValues,
        sub: createdCognitoUser.Username,
        cognitoStatus: createdCognitoUser.UserStatus as CognitoUserStatusType,
        owner: agentUser.getUsername(),
      };
      log(LogLevel.info, 'CREATING_CLIENT', {
        label: 'CreateClientHandler',
        message: 'Creating client in DynamoDB',
      });
      const responseDataModel = await createClient(createClientInput, API);
      if (responseDataModel) {
        res.status(200).json(responseDataModel);
      } else {
        const errorCode = log(LogLevel.error, 'CREATED_CLIENT_BUT_NO_RETURN', {
          label: 'CreateClientHandler',
          message: 'GraphQL query created Client successfully but did not return it. This should never happen',
        });
        res.status(500).json({
          type: 'CREATED_CLIENT_BUT_NO_RETURN',
          message: 'GraphQL query created Client successfully but did not return it. This should never happen',
          errorCode,
        });
        return;
      }
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'CreateClientHandler',
      ...e,
    });
    if (isSimpleError(e)) {
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: e.message,
        errorCode,
      });
    } else {
      res.status(503).json({
        type: 'UNHANDLED_ERROR',
        message: 'See logs of server',
        errorCode,
      });
      return;
    }
  }
};

export default createClientHandler;
