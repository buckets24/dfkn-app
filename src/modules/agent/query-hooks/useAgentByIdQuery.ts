import API from '@aws-amplify/api';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AsyncReturnType } from 'type-fest';
import { requestAgentById } from '../agentService';
import { AGENTS_QUERY_KEY } from './agentQueryKeys';

export type UseAgentByIdQueryValue = AsyncReturnType<typeof requestAgentById>;
const useAgentByIdQuery = (
  id: string | null | undefined,
  options?: UseQueryOptions<UseAgentByIdQueryValue>
): UseQueryResult<UseAgentByIdQueryValue> => {
  return useQuery<UseAgentByIdQueryValue>(
    [AGENTS_QUERY_KEY, id],
    async () => {
      if (typeof id === 'string') {
        return await requestAgentById(id, API);
      }
    },
    {
      onError: (e: any) => {
        log(LogLevel.error, e?.message, {
          label: 'useAgentbyIdQuery',
          ...e,
        });
      },
      ...options,
    }
  );
};

export default useAgentByIdQuery;
