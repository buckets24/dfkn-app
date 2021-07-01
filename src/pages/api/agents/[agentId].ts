import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import AgentModel from 'src/modules/agent/api/AgentModel';
import deleteAgentbyIdHandler from 'src/modules/agent/handlers/deleteAgentbyIdHandler';
import getAgentByIdHandler from 'src/modules/agent/handlers/getAgentByIdHandler';
import { authAdminMiddleware, authMiddleware } from 'src/modules/auth/authMiddleware';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<AgentModel | SimpleError>>()
  .get(authMiddleware, getAgentByIdHandler)
  .delete(authAdminMiddleware, deleteAgentbyIdHandler);
