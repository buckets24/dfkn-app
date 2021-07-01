import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import Amplify, { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import { RequestHandler } from 'next-connect';
import config from 'src/AmplifyConfig';
import { PromiseValue } from 'type-fest';
import { requestAgentBySub } from 'src/modules/agent/agentService';

const getResponsibleAgentByIdHandler: RequestHandler<NextApiRequest, NextApiResponse> = async (req, res) => {
  Amplify.configure({
    ...config,
    aws_appsync_authenticationType: 'API_KEY',
  });

  const { Auth, API } = withSSRContext({ req });
  const { query } = req;
  const agentId = query.agentId;

  let agent: PromiseValue<ReturnType<typeof requestAgentBySub>> | null = null;

  try {
    if (typeof agentId === 'string') {
      if (!(Auth instanceof AuthClass)) {
        const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
          label: 'GetResponsibleAgentByIdHandler',
          message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
        });
        res.status(500).json({
          type: 'UNKNOWN_ERROR',
          message: 'withSSRContext returned an object that is not an AuthClass. Which should be impossible',
          errorCode,
        });
        return;
      }

      agent = (await requestAgentBySub(agentId, API)) ?? null;

      res.status(200).json(agent);
    }
  } catch (e) {
    const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
      label: 'getResponsibleAgentByIdHandler',
      message: 'There was an error fetching the responsible agent',
    });
    res.status(500).json({
      type: 'UNKNOWN_ERROR',
      message: 'Unknown error in catch of getResponsibleAgentByIdHandler, see logs',
      errorCode,
    });
  }
};

export default getResponsibleAgentByIdHandler;
