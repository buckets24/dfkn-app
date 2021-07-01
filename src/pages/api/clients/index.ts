import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import { authAgentMiddleware } from 'src/modules/auth/authMiddleware';
import ClientModel from 'src/modules/client/api/ClientModel';
import createClientHandler from 'src/modules/client/handlers/createClientHandler';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<ClientModel | SimpleError>>().post(
  authAgentMiddleware,
  createClientHandler
);
