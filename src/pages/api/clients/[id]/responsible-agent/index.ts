import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import { AgentPublicModel } from 'src/modules/agent/api/AgentModel';
import { authClientWithIdMiddleware } from 'src/modules/auth/authMiddleware';
import getResponsibleAgentByIdHandler from 'src/modules/client/handlers/getResponsibleAgentByIdHandler';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<AgentPublicModel | SimpleError>>().get(
  authClientWithIdMiddleware,
  getResponsibleAgentByIdHandler
);
