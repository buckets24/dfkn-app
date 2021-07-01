import { APIClass, withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { CognitoUserStatusType } from 'src/API';
import { updateClientCognitoStatus } from 'src/modules/client/clientService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { resetCognitoPasswordByEmailOrSub } from '../cognitoService';
import fetchModelBySub from '../fetchModelBySub';

export type ResetPasswordHandlerResponse = 'SUCCESS';

const resetPasswordHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<ResetPasswordHandlerResponse | SimpleError>
> = async (req, res) => {
  const sub = req.query.sub;
  const SSRContext = withSSRContext({ req });
  const API = SSRContext.API as APIClass;

  if (typeof sub !== 'string') {
    const errorCode = log(LogLevel.error, 'MALFORMED_EMAIL', {
      label: 'resetPasswordByEmailHandler',
      message: 'The endpoint was called with an invalid sub',
    });
    res.status(400).json({
      type: 'MALFORMED_EMAIL',
      message: 'The endpoint was called with an invalid sub',
      errorCode,
    });
    return;
  }

  try {
    await resetCognitoPasswordByEmailOrSub(sub);

    try {
      const model = await fetchModelBySub(sub, API);
      if (model === undefined) {
        log(LogLevel.error, 'FAILED_TO_UPDATE_COGNITO_STATUS_MODEL', {
          label: 'fetchModelBySubInResetPasswordHandler',
          message: 'fetchModelBySub returned undefined even though resetCognitoPasswordbyEmailOrSub succeded',
        });
      } else if (model.type === 'CLIENT' && model.user) {
        await updateClientCognitoStatus(model.user.id, CognitoUserStatusType.RESET_REQUIRED, API);
      } else {
        /**
         * TODO: Update agent cognito status
         */
      }
    } catch (e) {}

    res.status(200).json('SUCCESS');
  } catch (e) {
    const errorCode = log(LogLevel.error, 'FAILED_TO_RESET_PASSWORD', {
      label: 'resetPasswordByEmailHandler',
      message: `Failed to reset the password of sub: ${sub}`,
    });
    res.status(500).json({
      type: 'FAILED_TO_RESET_PASSWORD',
      message: `Failed to reset the password of sub: ${sub}`,
      errorCode,
    });
  }
};

export default resetPasswordHandler;
