import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { AsyncReturnType } from 'type-fest';
import { createClientActivity } from '../../client/clientService';
import { CLIENT_ACTIVITIES_QUERY_KEY } from './clientActivityQueryKeys';

export type UseCreateClientActivityMutationValue = AsyncReturnType<typeof createClientActivity>;
export type UseCreateClientActivityMutationParams = Parameters<typeof createClientActivity>[0];

const useCreateClientActivityMutation = (
  options?: UseMutationOptions<UseCreateClientActivityMutationValue, SimpleError, UseCreateClientActivityMutationParams>
): UseMutationResult<UseCreateClientActivityMutationValue, SimpleError, UseCreateClientActivityMutationParams> => {
  const mutation = useMutation<
    UseCreateClientActivityMutationValue,
    SimpleError,
    UseCreateClientActivityMutationParams
  >(
    async (createClientActivityParameters) => {
      const createdMeeting = await createClientActivity(createClientActivityParameters, API);
      return createdMeeting;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([CLIENT_ACTIVITIES_QUERY_KEY]);
      },
      onError: (e) => {
        log(LogLevel.error, 'useCreateClientActivityMutation', {
          label: 'useCreateClientActivityMutation query hook',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useCreateClientActivityMutation;
