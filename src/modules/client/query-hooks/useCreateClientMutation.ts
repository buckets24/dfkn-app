import axios from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { ClientEditFormValues } from '../api/ClientModel';
import { createClient } from '../clientService';
import { CreateClientError, CreateClientResponse } from '../handlers/createClientHandler';
import { CLIENTS_QUERY_KEY } from './clientQueryKeys';

export type UseCreateClientMutationValue = AsyncReturnType<typeof createClient>;
export type UseCreateClientMutationParams = ClientEditFormValues;

const useCreateClientMutation = (
  options?: UseMutationOptions<UseCreateClientMutationValue, CreateClientError, UseCreateClientMutationParams>
): UseMutationResult<UseCreateClientMutationValue, CreateClientError, UseCreateClientMutationParams> => {
  const mutation = useMutation<UseCreateClientMutationValue, CreateClientError, UseCreateClientMutationParams>(
    async (createClientParameters) => {
      const response = await axios.post<CreateClientResponse>('/api/clients', createClientParameters);
      return response.data;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([CLIENTS_QUERY_KEY]);
      },
      onError: (e) => {
        log(LogLevel.error, 'useCreateClientMutation', {
          label: 'useCreateClientMutation query hook',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useCreateClientMutation;
