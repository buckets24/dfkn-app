import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import { authAgentMiddleware } from 'src/modules/auth/authMiddleware';
import ClientModel from 'src/modules/client/api/ClientModel';
import deleteClientbyIdHandler from 'src/modules/client/handlers/deleteClientbyIdHandler';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<ClientModel | SimpleError>>().delete(
  authAgentMiddleware,
  deleteClientbyIdHandler
);
