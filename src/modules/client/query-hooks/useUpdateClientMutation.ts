import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { updateClient } from '../clientService';
import { CLIENTS_QUERY_KEY } from './clientQueryKeys';

export type UseUpdateClientMutationValue = AsyncReturnType<typeof updateClient>;
export type UseUpdateClientMutationParams = Parameters<typeof updateClient>[0];

const useUpdateClientMutation = (
  options?: UseMutationOptions<UseUpdateClientMutationValue, unknown, UseUpdateClientMutationParams>
): UseMutationResult<UseUpdateClientMutationValue, unknown, UseUpdateClientMutationParams> => {
  const mutation = useMutation<UseUpdateClientMutationValue, unknown, UseUpdateClientMutationParams>(
    async (updateClientParameters) => {
      const updatedClient = await updateClient(updateClientParameters, API);
      return updatedClient;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([CLIENTS_QUERY_KEY]);
      },
      onError: (e: any) => {
        log(LogLevel.error, 'useUpdateClientMutation', {
          label: 'useUpdateClientMutation query hook',
          message: 'This is just a default message, it should always be overriden by the component',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useUpdateClientMutation;
