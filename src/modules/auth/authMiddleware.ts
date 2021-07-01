import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { AdminGetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { APIClass, withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { Middleware, RequestHandler } from 'next-connect';
import { ROLES } from 'src/API';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { requestAgentBySub } from '../agent/agentService';
import { GetAgentBySubQueryResult } from '../agent/api/AgentModel';
import { AGENT_ROLES } from '../agent/api/role';
import { GetClientBySubQueryResult } from '../client/api/ClientModel';
import { requestClientBySub } from '../client/clientService';
import { getUserFromCognito } from './cognitoService';
import hasCognitoGroup from './hasCognitoGroup';

export const authMiddleware: RequestHandler<NextApiRequest, NextApiResponse<SimpleError>> = async (req, res, next) => {
  try {
    const { Auth } = withSSRContext({ req });
    if (!(Auth instanceof AuthClass)) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'AuthMiddleware',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      });
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        errorCode,
      });
      return;
    }
    await Auth.currentAuthenticatedUser();
    next();
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNAUTHENTICATED', {
      label: 'AuthMiddleware',
      ...e,
    });
    res.status(401).json({
      type: 'UNAUTHENTICATED',
      message: 'Seems like the lambda function you were calling does not allow unauthenticated calls',
      errorCode,
    });
  }
};

export const authAdminMiddleware: RequestHandler<NextApiRequest, NextApiResponse<SimpleError>> = async (
  req,
  res,
  next
) => {
  try {
    const { Auth } = withSSRContext({ req });
    if (!(Auth instanceof AuthClass)) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'AuthAdminMiddleware',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      });
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        errorCode,
      });
      return;
    }
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (!(await hasCognitoGroup(cognitoUser, ROLES.Admin))) {
      const errorCode = log(LogLevel.error, 'UNAUTHORIZED', {
        label: 'AuthAdminMiddleware',
        message: 'You are not authorized to execute this action',
      });
      res.status(403).json({
        type: 'UNAUTHORIZED',
        message: 'You are not authorized to execute this action',
        errorCode,
      });
      return;
    }

    next();
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNAUTHENTICATED', {
      label: 'AuthAdminMiddleware',
      ...e,
    });
    res.status(401).json({
      type: 'UNAUTHENTICATED',
      message: 'Seems like the lambda function you were calling does not allow unauthenticated calls',
      errorCode,
    });
  }
};

export const authClientMiddleware: Middleware<NextApiRequest, NextApiResponse<SimpleError>> = async (
  req,
  res,
  next
) => {
  try {
    const { Auth } = withSSRContext({ req });
    if (!(Auth instanceof AuthClass)) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'AuthClientMiddleware',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      });
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        errorCode,
      });
      return;
    }
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (!(await hasCognitoGroup(cognitoUser, ROLES.Client))) {
      const errorCode = log(LogLevel.error, 'UNAUTHORIZED', {
        label: 'AuthClientMiddleware',
        message: 'You are not authorized to execute this action',
      });
      res.status(403).json({
        type: 'UNAUTHORIZED',
        message: 'You are not authorized to execute this action',
        errorCode,
      });
      return;
    }

    next();
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNAUTHENTICATED', {
      label: 'AuthClientMiddleware',
      ...e,
    });
    res.status(401).json({
      type: 'UNAUTHENTICATED',
      message: 'Seems like the lambda function you were calling does not allow unauthenticated calls',
      errorCode,
    });
  }
};

export const authClientWithIdMiddleware: RequestHandler<NextApiRequest, NextApiResponse<SimpleError>> = async (
  req,
  res,
  next
) => {
  try {
    const { Auth } = withSSRContext({ req });
    const { query } = req;
    const clientId = query.id;

    if (!(Auth instanceof AuthClass)) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'AuthClientWithIdMiddleware',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      });
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        errorCode,
      });
      return;
    }
    const cognitoUser = await Auth.currentAuthenticatedUser();

    if (!((await hasCognitoGroup(cognitoUser, ROLES.Client)) && clientId === cognitoUser.getUsername())) {
      const errorCode = log(LogLevel.error, 'UNAUTHORIZED', {
        label: 'AuthClientWithIdMiddleware',
        message: 'You are not authorized to execute this action',
      });
      res.status(403).json({
        type: 'UNAUTHORIZED',
        message: 'You are not authorized to execute this action',
        errorCode,
      });
      return;
    }

    next();
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNAUTHENTICATED', {
      label: 'AuthClientWithIdMiddleware',
      ...e,
    });
    res.status(401).json({
      type: 'UNAUTHENTICATED',
      message: 'Seems like the lambda function you were calling does not allow unauthenticated calls',
      errorCode,
    });
  }
};

export const authAgentMiddleware: RequestHandler<NextApiRequest, NextApiResponse<SimpleError>> = async (
  req,
  res,
  next
) => {
  try {
    const { Auth } = withSSRContext({ req });
    if (!(Auth instanceof AuthClass)) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'AuthAgentMiddleware',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      });
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        errorCode,
      });
      return;
    }
    const cognitoUser = await Auth.currentAuthenticatedUser();

    if (!(await hasCognitoGroup(cognitoUser, [...AGENT_ROLES]))) {
      const errorCode = log(LogLevel.error, 'UNAUTHORIZED', {
        label: 'AuthAgentMiddleware',
        message: 'You are not authorized to execute this action',
      });
      res.status(403).json({
        type: 'UNAUTHORIZED',
        message: 'You are not authorized to execute this action',
        errorCode,
      });
      return;
    }

    next();
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNAUTHENTICATED', {
      label: 'AuthAgentMiddleware',
      ...e,
    });
    res.status(401).json({
      type: 'UNAUTHENTICATED',
      message: 'Seems like the lambda function you were calling does not allow unauthenticated calls',
      errorCode,
    });
  }
};

export const authAgentOrAdminMiddleware: RequestHandler<NextApiRequest, NextApiResponse<SimpleError>> = async (
  req,
  res,
  next
) => {
  try {
    const { Auth } = withSSRContext({ req });
    if (!(Auth instanceof AuthClass)) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'AuthAgentOrAdminMiddlware',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      });
      res.status(500).json({
        type: 'UNKNOWN_ERROR',
        message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        errorCode,
      });
      return;
    }
    const cognitoUser = await Auth.currentAuthenticatedUser();
    if (!(await hasCognitoGroup(cognitoUser, [...AGENT_ROLES, ROLES.Admin]))) {
      const errorCode = log(LogLevel.error, 'UNAUTHORIZED', {
        label: 'AuthAgentOrAdminMiddlware',
        message: 'You are not authorized to execute this action',
      });
      res.status(403).json({
        type: 'UNAUTHORIZED',
        message: 'You are not authorized to execute this action',
        errorCode,
      });
      return;
    }

    next();
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNAUTHORIZED', {
      label: 'AuthAgentOrAdminMiddlware',
      message: 'You are not authorized to execute this action',
    });
    res.status(401).json({
      type: 'UNAUTHENTICATED',
      message: 'Seems like the lambda function you were calling does not allow unauthenticated calls',
      errorCode,
    });
  }
};

/**
 * This middleware checks if the currently authenticated user is even allowed
 * to handle the target CognitoUser via sub to owner check.
 * This automatically rejects any request that is not from an Admin or Agent
 */
export const authCanHandleCognitoBySubMiddleware: RequestHandler<NextApiRequest, NextApiResponse<SimpleError>> = async (
  req,
  res,
  next
) => {
  try {
    const SSRContext = withSSRContext({ req });
    const Auth = SSRContext.Auth as AuthClass;
    const API = SSRContext.API as APIClass;

    const sub = req.query.sub;

    if (typeof sub !== 'string') {
      const type = 'MALFORMED_SUB';
      const message = 'Endpoint was called with a malformed sub';
      const errorCode = log(LogLevel.error, type, {
        label: 'AuthCanHandleCognitoBySubMiddleware',
        message,
      });
      res.status(400).json({ type, message, errorCode });
      return;
    }

    let currentCognitoUser: CognitoUser | undefined = undefined;
    let targetCognitoUser: AdminGetUserCommandOutput | undefined = undefined;
    let targetModel: GetAgentBySubQueryResult | GetClientBySubQueryResult | undefined | null = undefined;

    /**
     * Check if there is an authenticated user calling the endpoint
     */
    try {
      currentCognitoUser = await Auth.currentAuthenticatedUser();
      if (currentCognitoUser === undefined) {
        throw new Error('Auth.currentAuthenticatedUser returned undefined');
      }
    } catch (e) {
      const type = 'UNAUTHENTICATED';
      const message = 'Seems like the lambda function you were calling does not allow unauthenticated calls';
      const errorCode = log(LogLevel.error, type, {
        label: 'AuthCanHandleCognitoBySubMiddleware',
        message,
      });
      res.status(401).json({ type, message, errorCode });
      return;
    }

    /**
     * Check if the authenticated user has the correct roles. This middleware only allows
     * agents or admins
     */
    if (!(await hasCognitoGroup(currentCognitoUser, [...AGENT_ROLES, ROLES.Admin]))) {
      const type = 'UNAUTHORIZED';
      const message = 'You are not authorized to execute this action';
      const errorCode = log(LogLevel.error, type, {
        label: 'AuthCanHandleCognitoBySubMiddleware',
        message,
      });
      res.status(403).json({ type, message, errorCode });
      return;
    }

    try {
      targetCognitoUser = await getUserFromCognito(sub);
      if (targetCognitoUser === undefined) {
        throw new Error(`The cognito user with an sub ${sub} was not found in the user pool`);
      }
      if (targetCognitoUser.Username === undefined) {
        throw new Error(`The cognito user with an sub ${sub} was found but did not have a sub`);
      }
    } catch (e) {
      const type = 'TARGET_COGNITO_USER_NOT_FOUND';
      const message = e.message ?? `The cognito user with an sub ${sub} was not found in the user pool`;
      const errorCode = log(LogLevel.error, type, {
        label: 'AuthCanHandleCognitoBySubMiddleware',
        message,
      });
      res.status(404).json({ type, message, errorCode });
      return;
    }

    try {
      targetModel = await requestAgentBySub(targetCognitoUser.Username, API);
      if (targetModel === undefined || targetModel === null) {
        targetModel = await requestClientBySub(targetCognitoUser.Username, API);
      }
      if (targetModel === undefined || targetModel === null) {
        throw new Error(`No agent or client exists with the sub: ${sub} OR sub: ${targetCognitoUser.Username}`);
      }
    } catch (e) {
      const type = 'COULD_NOT_FIND_MODEL';
      const message =
        e.message ?? `No agent or client exists with the sub: ${sub} OR sub: ${targetCognitoUser.Username}`;
      const errorCode = log(LogLevel.error, type, {
        label: 'AuthCanHandleCognitoBySubMiddleware',
        message,
      });
      res.status(404).json({ type, message, errorCode });

      return;
    }

    const isAdmin = await hasCognitoGroup(currentCognitoUser, ROLES.Admin);
    if (targetModel.owner === currentCognitoUser.getUsername() || isAdmin) {
      next();
    } else {
      const type = 'NOT_ALLOWED_TO_MANAGE_USER';
      const message = `It seems you're not allowed to manage this user.`;
      const errorCode = log(LogLevel.error, type, {
        label: 'AuthCanHandleCognitoBySubMiddleware',
        message,
      });
      res.status(401).json({ type, message, errorCode });
      return;
    }

    // const matchingModel: GetAgentBySubQuery['getAgentBySub'] =
  } catch (e) {
    /**
     * This can only happen if an error was completely ignored but this is super
     * unlikely and i would argue impossible since we'll have granular try/catch
     * above.
     */
    const errorCode = log(LogLevel.error, 'AuthCanHandleCognitoBySubMiddleware', {
      label: 'AuthCanHandleCognitoBySubMiddleware',
      message: 'Unhandled error within authCanHandleCognitoBySubMiddleware',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR_IN_MIDDLEWARE',
      message: 'The authCanHandleCognitoBySubMiddleware threw an error that was completely unhandled.',
      errorCode,
    });
    return;
  }
};
