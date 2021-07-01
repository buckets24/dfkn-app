import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import { authMiddleware } from 'src/modules/auth/authMiddleware';
import ClientModel from 'src/modules/client/api/ClientModel';
import checkEmailExist from 'src/modules/common/handler/checkEmailExist';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<ClientModel | SimpleError>>().get(
  authMiddleware,
  checkEmailExist
);
