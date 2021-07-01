import { AdminCreateUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { APIClass, withSSRContext } from 'aws-amplify';
import { sendEmail } from 'jexity-app/utils/emailClient';
import { generatePassword } from 'jexity-app/utils/generatePassword';
import { log, LogLevel, responseErrorWithLogger } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import ReactDOMServer from 'react-dom/server';
import { AccountStatus } from 'src/API';
import { requestAgentBySub, updateAgentStatus } from 'src/modules/agent/agentService';
import { requestClientBySub, updateClientStatus } from 'src/modules/client/clientService';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { PromiseValue } from 'type-fest';
import { setTemporaryPassword } from '../cognitoService';
import syncCognitoStatusToModel from '../syncCognitoStatusToModel';
import ResetPasswordEmail from './ResetPasswordEmail';

export type SendPasswordHandlerResponse = AdminCreateUserCommandOutput;

/**
 * TODO:
 * This handler can be optimized to be more efficient if it received the id
 * of the client as well and not just the email. This can be done later since
 * we're prioritizing speed of development
 */

const sendPasswordHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<SendPasswordHandlerResponse | SimpleError>
> = async (req, res) => {
  const SSRContext = withSSRContext({ req });
  const API = SSRContext.API as APIClass;

  const sub = req.query.sub;
  if (typeof sub !== 'string') {
    const errorCode = log(LogLevel.error, 'NO_EMAIL_PROVIDED', {
      label: 'sendPasswordEmailHandler',
      message: 'No email was provided in the send password email handler',
    });
    res.status(400).json({
      type: 'NO_EMAIL_PROVIDED',
      message: 'No email was provided in the send password email handler',
      errorCode,
    });
    return;
  }

  let user:
    | PromiseValue<ReturnType<typeof requestClientBySub>>
    | (PromiseValue<ReturnType<typeof requestAgentBySub>> & { title?: string })
    | undefined = undefined;

  let userType: 'CLIENT' | 'AGENT' | undefined = undefined;
  try {
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
  } catch (e) {
    log(LogLevel.error, 'FAILED_TO_UPDATE_USER_STATUS', {
      label: 'sendPasswordEmailHandler',
      message: 'Failed to update the account status to `EMAIL_SENT`',
      ...e,
    });

    responseErrorWithLogger(res, {
      status: 500,
      label: 'sendPasswordEmailHandler',
      message: e.message ?? 'Failed to resend temporary email to client',
      type: 'FAILED_TO_RESEND_TEMPORARY_PASSWORD',
    });
    return;
  }

  try {
    const password = generatePassword();
    const setPasswordResponse = await setTemporaryPassword(user.email, password);
    const { salutation = '', firstName, lastName, email, title = '' } = user;
    const emailBody = ReactDOMServer.renderToString(
      ResetPasswordEmail(salutation, firstName, lastName, email, password, title)
    );

    await sendEmail({
      html: emailBody,
      subject: 'Ihre Zugangsdaten für Nessy Cloud by DFK Nord AG',
      text: emailBody,
      to: user.email,
    });

    res.status(200).json(setPasswordResponse);
  } catch (e) {
    responseErrorWithLogger(res, {
      status: 500,
      label: 'sendPasswordEmailHandler',
      message: e.message ?? 'Failed to resend temporary email to client',
      type: 'FAILED_TO_RESEND_TEMPORARY_PASSWORD',
    });
  }

  try {
    if (user.sub) {
      await syncCognitoStatusToModel(user.email, API);
      if (userType === 'AGENT') {
        await updateAgentStatus(user.id, AccountStatus.EMAIL_SENT, API);
      } else {
        await updateClientStatus(user.id, AccountStatus.EMAIL_SENT, API);
      }
    } else {
      throw new Error('Failed to sync status to server');
    }
  } catch (e) {
    log(LogLevel.error, 'FAILED_TO_SYNC_STATUS', {
      label: 'sendPasswordHandler',
      message: e.message ?? 'Failed to sync status to server',
      ...e,
    });
  }
};

export default sendPasswordHandler;
