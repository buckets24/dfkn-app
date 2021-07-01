import API from '@aws-amplify/api';
import { useToast } from '@chakra-ui/react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AsyncReturnType } from 'type-fest';
import { activityToastLoadingUnknownErr } from '../activityMsg';
import { requestClientActivitiesByClientId } from '../activityService';
import { CLIENT_ACTIVITIES_QUERY_KEY } from './clientActivityQueryKeys';

export type UseClientActivitiesByClientIdQueryValue = AsyncReturnType<typeof requestClientActivitiesByClientId>;

const useClientActivitiesByClientIdQuery = (
  clientId: string | undefined | null,
  options?: UseQueryOptions<UseClientActivitiesByClientIdQueryValue, unknown>
): UseQueryResult<UseClientActivitiesByClientIdQueryValue> => {
  const toast = useToast();

  const query = useQuery<UseClientActivitiesByClientIdQueryValue, unknown>(
    [CLIENT_ACTIVITIES_QUERY_KEY, clientId],
    async () => {
      if (typeof clientId === 'string') {
        return await requestClientActivitiesByClientId(clientId, API);
      } else {
        return undefined;
      }
    },
    {
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e?.message ?? 'UseClientActivitiesByClientIdQuery', e);
        toast(activityToastLoadingUnknownErr(errorCode));
      },
      ...options,
    }
  );

  return query;
};

export default useClientActivitiesByClientIdQuery;
