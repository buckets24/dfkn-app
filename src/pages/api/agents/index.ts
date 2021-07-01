import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import AgentModel from 'src/modules/agent/api/AgentModel';
import createAgentHandler from 'src/modules/agent/handlers/createAgentHandler';
import getAllAgentsBasicInfoHandler from 'src/modules/agent/handlers/getAllAgentsBasicInfoHandler';
import { authAdminMiddleware, authMiddleware } from 'src/modules/auth/authMiddleware';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<AgentModel | SimpleError>>()
  .get(authMiddleware, getAllAgentsBasicInfoHandler)
  .post(authAdminMiddleware, createAgentHandler);
