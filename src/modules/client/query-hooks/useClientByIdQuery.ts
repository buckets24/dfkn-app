import { useToast } from '@chakra-ui/react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AsyncReturnType } from 'type-fest';
import { clientToastLoadingUnknownErr } from '../clientMsg';
import { requestClientById } from '../clientService';
import { CLIENTS_QUERY_KEY } from './clientQueryKeys';

export type UseClientByIdQueryValue = AsyncReturnType<typeof requestClientById>;

const useClientByIdQuery = (
  id: string | undefined | null,
  options?: UseQueryOptions<UseClientByIdQueryValue, unknown>
): UseQueryResult<UseClientByIdQueryValue> => {
  const toast = useToast();

  const query = useQuery<UseClientByIdQueryValue, unknown>(
    [CLIENTS_QUERY_KEY, id],
    async () => {
      if (typeof id === 'string') {
        return await requestClientById(id);
      } else {
        return undefined;
      }
    },
    {
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e?.message ?? 'UseClientByIdQuery', e);
        toast(clientToastLoadingUnknownErr(errorCode));
      },
      ...options,
    }
  );

  return query;
};

export default useClientByIdQuery;
