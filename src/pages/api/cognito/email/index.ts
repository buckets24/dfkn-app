import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import AgentModel from 'src/modules/agent/api/AgentModel';
import { authAgentOrAdminMiddleware } from 'src/modules/auth/authMiddleware';
import getCognitoUserbyEmailHandler from 'src/modules/auth/handlers/getCognitoUserByEmailHandler';
import updateClientAttributesHandler from 'src/modules/client/handlers/updateClientAttributesHandler';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<AgentModel | SimpleError>>()
  .get(authAgentOrAdminMiddleware, getCognitoUserbyEmailHandler)
  .put(authAgentOrAdminMiddleware, updateClientAttributesHandler);
