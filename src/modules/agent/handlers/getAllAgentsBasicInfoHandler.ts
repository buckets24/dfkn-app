import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { requestAllAgents } from '../agentService';
import { AgentPublicModel } from '../api/AgentModel';

const getAllAgentsBasicInfoHandler: RequestHandler<
  NextApiRequest,
  NextApiResponse<AgentPublicModel[] | SimpleError>
> = async (req, res) => {
  let agents: AgentPublicModel[] = [];

  try {
    const reponse = await requestAllAgents();
    if (reponse?.items) {
      agents = reponse.items.filter(removeEmptyArrayItems).map((agent) => {
        return {
          id: agent.id,
          sub: agent.sub,
          salutation: agent.salutation,
          email: agent.email,
          firstName: agent.firstName,
          lastName: agent.lastName,
          role: agent.role,
        };
      });
    }

    res.status(200).json(agents);
    return;
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'GetAgentBySubHandler',
      ...e,
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      errorCode,
      ...e,
    });
  }
};

export default getAllAgentsBasicInfoHandler;
