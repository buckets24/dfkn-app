import { useToast } from '@chakra-ui/toast';
import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from 'react-query';
import { PromiseValue } from 'type-fest';
import { meetingToastLoadingUnknownErr } from '../meetingsMsg';
import { requestMeetingsByOwner } from '../meetingsService';
import { MEETINGS_QUERY_KEY } from './meetingQueryKeys';

export type UseMeetingsByOwnerInfiniteQueryValue = PromiseValue<ReturnType<typeof requestMeetingsByOwner>>;
export type PaginatedMeetings = ReturnType<typeof useMeetingsByOwnerInfiniteQuery>['data'];
const useMeetingsByOwnerInfiniteQuery = (
  owner: string | null | undefined,
  options?: UseInfiniteQueryOptions<UseMeetingsByOwnerInfiniteQueryValue>
): UseInfiniteQueryResult<UseMeetingsByOwnerInfiniteQueryValue> => {
  const toast = useToast();

  return useInfiniteQuery(
    [MEETINGS_QUERY_KEY],
    async ({ pageParam = undefined }: QueryFunctionContext<QueryKey, string | undefined>) => {
      if (owner) {
        return requestMeetingsByOwner(
          {
            owner,
            nextToken: pageParam,
          },
          API
        );
      }
    },
    {
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e.message, { label: 'MeetingList', ...e });
        toast(meetingToastLoadingUnknownErr(errorCode));
      },
      getNextPageParam: (nextPage) => (nextPage?.nextToken ? nextPage.nextToken : undefined),
      ...options,
    }
  );
};

export default useMeetingsByOwnerInfiniteQuery;
