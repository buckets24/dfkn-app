import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import 'src/AmplifyConfig';
import syncCognitoStatusToModelHandler from 'src/modules/auth/handlers/syncCognitoStatusToModelHandler';
import { SyncCognitoStatusToModelResult } from 'src/modules/auth/syncCognitoStatusToModel';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<SimpleError | SyncCognitoStatusToModelResult>>().patch(
  syncCognitoStatusToModelHandler
);
