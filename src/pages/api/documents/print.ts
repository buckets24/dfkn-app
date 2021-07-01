import { NextApiRequest, NextApiResponse } from 'next';
import generatePDF, { DocumentsRequestError, PrintResponse } from 'src/modules/documents/api/generatePDF';
import { Amplify } from 'aws-amplify';
import { LogLevel, log } from 'jexity-app/utils/logger';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require('../../../aws-exports').default;
  Amplify.configure({ ...config, aws_appsync_authenticationType: 'API_KEY', ssr: true });
} else {
  Amplify.configure({
    aws_project_region: process.env.NEXT_PUBLIC_aws_project_region,
    aws_appsync_graphqlEndpoint: process.env.NEXT_PUBLIC_aws_appsync_graphqlEndpoint,
    aws_appsync_region: process.env.NEXT_PUBLIC_aws_appsync_region,
    aws_appsync_apiKey: process.env.aws_appsync_apiKey,
    aws_cognito_region: process.env.NEXT_PUBLIC_aws_cognito_region,
    aws_user_pools_id: process.env.NEXT_PUBLIC_aws_user_pools_id,
    aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_aws_user_pools_web_client_id,
    aws_appsync_authenticationType: 'API_KEY',
    oauth: {},
    ssr: true,
  });
}

const printHandler = async (req: NextApiRequest, res: NextApiResponse<PrintResponse | SimpleError>): Promise<void> => {
  const documentId = req.query.documentId;
  if (typeof documentId === 'string') {
    try {
      const buffer = await generatePDF(documentId, req.headers.cookie);

      if (buffer) {
        const base64 = buffer.toString('base64');
        const dataUrl = `data:application/pdf;base64,${base64}`;
        const output = { dataUrl };

        res.status(200).json(output);
      } else {
        const errorCode = log(LogLevel.error, 'NO_COOKIE', {
          label: 'PrintEndpoint',
          message: 'No cookies were set in the request in printHandler function',
        });
        res.status(401).json({
          type: 'NO_COOKIE',
          message: 'No cookies were set in the request in printHandler function',
          errorCode,
        });
      }
    } catch (e) {
      const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
        label: 'PrintEndpoint',
        message: 'An error occurred while generating the PDF',
      });
      res.status(500).json({ type: 'UNKNOWN_ERROR', message: 'An error occurred while generating the PDF', errorCode });
    }
  } else {
    const errorCode = log(LogLevel.error, 'INVALID_DOCUMENT_ID', {
      label: 'PrintEndpoint',
      message: `Query parameter documentId seems to be the wrong format`,
    });
    res.status(400).json({
      type: 'INVALID_DOCUMENT_ID',
      message: `Query parameter documentId seems to be the wrong format`,
      errorCode,
    });
  }
};

export default printHandler;
