import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { AdminUpdateUserAttributesCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { updateUserAttributes } from 'src/modules/auth/cognitoService';
import { isSimpleError, SimpleError } from 'src/utils/type-utils/SimpleError';

const updateClientAttributesHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<AdminUpdateUserAttributesCommandOutput | SimpleError>
> = async (req, res) => {
  const { Auth } = withSSRContext({ req });
  const { body } = req;
  const { email, attributes } = body;

  if (!(Auth instanceof AuthClass)) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'UpdateClientAttributesHandler',
      message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
      errorCode,
    });
    return;
  }

  try {
    if (email && attributes.length > 0) {
      const updateUser = await updateUserAttributes(email, attributes);
      res.status(200).json(updateUser);
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'UpdateClientAttributesHandler',
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

export default updateClientAttributesHandler;
