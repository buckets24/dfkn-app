import { AdminGetUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { getUserFromCognito } from '../cognitoService';

export type GetCognitoUserResponse = AdminGetUserCommandOutput | undefined;

const getCognitoUserbyEmailHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<GetCognitoUserResponse | SimpleError>
> = async (req, res) => {
  const email = req.query.email;

  /**
   * TODO Check permissions.
   * Should check if the requester is the owner of the client.
   * Probably best to make a middleware
   * Alternatively this can be a custom function resolver.
   */

  if (typeof email !== 'string') {
    const errorCode = log(LogLevel.error, 'NO_EMAIL_PROVIDED', {
      label: 'getCognitoUserByEmailHandler',
      message: 'No email was provided in the get cognito endpoint',
    });
    res.status(400).json({
      type: 'NO_EMAIL_PROVIDED',
      message: 'No email was provided in the get cognito endpoint',
      errorCode,
    });
    return;
  }
  const cognitoUser = await getUserFromCognito(email);

  res.status(200).json(cognitoUser);
};

export default getCognitoUserbyEmailHandler;
