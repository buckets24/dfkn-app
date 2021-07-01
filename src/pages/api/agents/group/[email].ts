import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import AgentModel from 'src/modules/agent/api/AgentModel';
import updateAgentGroup from 'src/modules/agent/handlers/updateAgentGroup';
import { authAdminMiddleware } from 'src/modules/auth/authMiddleware';
import { SimpleError } from 'src/utils/type-utils/SimpleError';

export default handler<NextApiRequest, NextApiResponse<AgentModel | SimpleError>>().put(
  authAdminMiddleware,
  updateAgentGroup
);
