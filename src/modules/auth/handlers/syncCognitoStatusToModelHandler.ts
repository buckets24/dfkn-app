import Amplify, { API, APIClass, withSSRContext } from 'aws-amplify';
import { log, LogLevel, responseErrorWithLogger } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import syncCognitoStatusToModel from '../syncCognitoStatusToModel';
import config from 'src/AmplifyConfig';

/**
 * TODO:
 * This handler can be optimized to be more efficient if it received the id
 * of the client as well and not just the email. This can be done later since
 * we're prioritizing speed of development
 */

Amplify.configure({
  ...config,
  aws_appsync_authenticationType: 'API_KEY',
});

const syncCognitoStatusToModelHandler: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res) => {
  const subOrEmail = req.query.subOrEmail;

  if (typeof subOrEmail !== 'string') {
    responseErrorWithLogger(res, {
      status: 400,
      type: 'MALFORMED_SUB_TO_COGNITO_SYNC_HANDLER',
      message: 'No sub was provided to syncCognitoStatusToModelHandler',
      label: 'syncCognitoStatusToModelHandler',
    });
    return;
  }

  try {
    log(LogLevel.info, 'SYNCING_COGNITO_STATUS_TO_MODEL', {
      label: 'syncCognitoStatusToModelHandler',
      message: 'Syncing cognito status to model',
    });

    const updatedModel = await syncCognitoStatusToModel(subOrEmail, API);
    if (updatedModel) {
      res.status(200).json(updatedModel);
    } else {
      throw new Error('syncCognitoStatusToModel returned an undefined model');
    }
  } catch (e) {
    const errorMessage = typeof e === 'string' ? e : e.message;
    responseErrorWithLogger(res, {
      status: 400,
      type: 'SYNC_COGNITO_STATUS_FAILED',
      message: errorMessage ?? 'syncCognitoStatusToModel threw an error',
      label: 'syncCognitoStatusToModelHandler',
    });
  }
};

export default syncCognitoStatusToModelHandler;
