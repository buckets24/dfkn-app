import API from '@aws-amplify/api';
import { log, LogLevel } from 'jexity-app/utils/logger';
import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query';
import { PromiseValue } from 'type-fest';
import { requestAgents } from '../agentService';
import { AGENTS_QUERY_KEY } from './agentQueryKeys';

type RequestAgentsResult = PromiseValue<ReturnType<typeof requestAgents>>;
export type UseAgentsInfiniteQueryValue = InfiniteData<RequestAgentsResult>;

const useAgentsInfiniteQuery = (
  options?: UseInfiniteQueryOptions<RequestAgentsResult, unknown>
): UseInfiniteQueryResult<RequestAgentsResult> => {
  return useInfiniteQuery(
    [AGENTS_QUERY_KEY],
    async ({ pageParam = undefined }: QueryFunctionContext<QueryKey, string | undefined>) => {
      return await requestAgents(
        {
          limit: 100,
          nextToken: pageParam,
        },
        API
      );
    },
    {
      onError: (e: any) => {
        log(LogLevel.error, e.message, { label: 'useAgentsInfiniteQuery', ...e });
      },
      getNextPageParam: (nextPage) => (nextPage?.nextToken ? nextPage.nextToken : undefined),
      ...options,
    }
  );
};

export default useAgentsInfiniteQuery;
