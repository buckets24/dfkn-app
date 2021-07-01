import { SendEmailCommandOutput, SESv2 } from '@aws-sdk/client-sesv2';
import { log, LogLevel } from './logger';

export interface EmailParameters {
  to: string;
  subject: string;
  text: string;
  html: string;
  charset?: string;
}

export async function sendEmail(emailParameters: EmailParameters): Promise<SendEmailCommandOutput> {
  const { to, subject, text, html, charset = 'UTF-8' } = emailParameters;
  const from = process.env.AWS_SES_FROM_EMAIL ?? '';

  const ses = new SESv2({
    apiVersion: '2019-09-27',
    region: 'eu-central-1',
    credentials: {
      secretAccessKey: process.env.AWS_SES_SECRET_KEY ?? '',
      accessKeyId: process.env.AWS_SES_ACCESS_KEY ?? '',
    },
  });

  try {
    return await ses.sendEmail({
      Destination: {
        /* required */
        ToAddresses: [to],
      },
      FromEmailAddress: from,
      Content: {
        /* required */
        Simple: {
          Body: {
            /* required */
            Html: {
              Data: html /* required */,
              Charset: charset,
            },
            Text: {
              Data: text /* required */,
              Charset: charset,
            },
          },
          Subject: {
            /* required */
            Data: subject /* required */,
            Charset: charset,
          },
        },
      },
    });
  } catch (err) {
    log(LogLevel.error, 'FAILED_TO_SEND_EMAIL', {
      label: 'EmailClient',
      message: `Failed to send email to ${to}. Sending from ${from}`,
      ...err,
    });

    /** Still throw an error for the handler to handle */
    throw err;
  }
}
