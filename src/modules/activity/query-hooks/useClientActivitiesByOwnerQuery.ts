import API from '@aws-amplify/api';
import { useToast } from '@chakra-ui/react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AsyncReturnType } from 'type-fest';
import { activityToastLoadingUnknownErr } from '../activityMsg';
import { requestClientActivitiesByOwner } from '../activityService';
import { CLIENT_ACTIVITIES_QUERY_KEY } from './clientActivityQueryKeys';

export type UseClientActivitiesByOwnerQueryValue = AsyncReturnType<typeof requestClientActivitiesByOwner>;

const useClientActivitiesByOwnerQuery = (
  owner: string | undefined | null,
  options?: UseQueryOptions<UseClientActivitiesByOwnerQueryValue, unknown>
): UseQueryResult<UseClientActivitiesByOwnerQueryValue> => {
  const toast = useToast();

  const query = useQuery<UseClientActivitiesByOwnerQueryValue, unknown>(
    [CLIENT_ACTIVITIES_QUERY_KEY, owner],
    async () => {
      if (typeof owner === 'string') {
        return await requestClientActivitiesByOwner({ owner: owner }, API);
      } else {
        return undefined;
      }
    },
    {
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e?.message ?? 'UseClientActivitiesByOwnerQuery', e);
        toast(activityToastLoadingUnknownErr(errorCode));
      },
      ...options,
    }
  );

  return query;
};

export default useClientActivitiesByOwnerQuery;
