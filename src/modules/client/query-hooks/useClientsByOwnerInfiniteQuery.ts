import { useToast } from '@chakra-ui/toast';
import { API } from 'aws-amplify';
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
import { clientToastLoadingUnknownErr } from '../clientMsg';
import { requestClientsByOwner } from '../clientService';
import { CLIENTS_QUERY_KEY } from './clientQueryKeys';

type RequestClientsByOwnerResult = PromiseValue<ReturnType<typeof requestClientsByOwner>>;
export type UseClientsByOwnerInfiniteQueryValue = InfiniteData<RequestClientsByOwnerResult>;

const useClientsByOwnerIdInfiniteQuery = (
  owner: string | undefined | null,
  options?: UseInfiniteQueryOptions<RequestClientsByOwnerResult, unknown>
): UseInfiniteQueryResult<RequestClientsByOwnerResult> => {
  const toast = useToast();

  return useInfiniteQuery(
    [CLIENTS_QUERY_KEY],
    async ({ pageParam = undefined }: QueryFunctionContext<QueryKey, string | undefined>) => {
      if (owner) {
        return await requestClientsByOwner(
          {
            owner,
            limit: 100,
            nextToken: pageParam,
          },
          API
        );
      } else {
        undefined;
      }
    },
    {
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e.message, { label: 'UseClientsByOwnerIdInfiniteQuery', ...e });
        toast(clientToastLoadingUnknownErr(errorCode));
      },
      getNextPageParam: (nextPage): string | undefined => {
        return nextPage?.nextToken ? nextPage.nextToken : undefined;
      },
      ...options,
    }
  );
};

export default useClientsByOwnerIdInfiniteQuery;
