/**
 * Get the corresponding client or sub model depending on the sub
 */

import { GraphQLAPIClass } from '@aws-amplify/api-graphql';
import { APIClass } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { PromiseValue } from 'type-fest';
import { requestAgentBySub } from '../agent/agentService';
import { requestClientBySub } from '../client/clientService';

type RequestBySubResult =
  | PromiseValue<ReturnType<typeof requestAgentBySub>>
  | PromiseValue<ReturnType<typeof requestClientBySub>>;

export type FetchModelBySubResult =
  | {
      user: RequestBySubResult;
      type: 'AGENT' | 'CLIENT';
    }
  | undefined;

const fetchModelBySub = async (sub: string, API: APIClass | GraphQLAPIClass): Promise<FetchModelBySubResult> => {
  let user: RequestBySubResult = undefined;

  log(LogLevel.info, 'REQUESTING_CLIENT', {
    label: 'fetchModelBySub',
    message: 'Requesting agent by sub',
  });
  user = await requestClientBySub(sub, API);
  if (user) {
    return { user, type: 'CLIENT' };
  }

  log(LogLevel.info, 'REQUESTING_AGENT', {
    label: 'fetchModelBySub',
    message: 'Requesting agent by sub',
  });
  user = await requestAgentBySub(sub, API);

  if (user) {
    return { user, type: 'AGENT' };
  }
};

export default fetchModelBySub;
