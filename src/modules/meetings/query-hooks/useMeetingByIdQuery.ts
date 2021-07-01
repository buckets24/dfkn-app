import API from '@aws-amplify/api';
import { useToast } from '@chakra-ui/toast';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { PromiseValue } from 'type-fest';
import { meetingToastLoadingUnknownErr } from '../meetingsMsg';
import { requestMeetingById } from '../meetingsService';
import { MEETINGS_QUERY_KEY } from './meetingQueryKeys';

export type UseMeetingByIdQueryValue = PromiseValue<ReturnType<typeof requestMeetingById>>;
const useMeetingByIdQuery = (
  id: string | undefined | null,
  options?: UseQueryOptions<UseMeetingByIdQueryValue, unknown>
): UseQueryResult<UseMeetingByIdQueryValue> => {
  const toast = useToast();

  return useQuery<UseMeetingByIdQueryValue, unknown>(
    [MEETINGS_QUERY_KEY, id],
    async () => {
      if (typeof id === 'string') {
        return await requestMeetingById(id, API);
      }
    },
    {
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e.message, { label: 'Meeting By id query', ...e });
        toast(meetingToastLoadingUnknownErr(errorCode));
      },
      ...options,
    }
  );
};

export default useMeetingByIdQuery;
