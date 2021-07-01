import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { updateClientActivity } from '../activityService';
import { CLIENT_ACTIVITIES_QUERY_KEY } from './clientActivityQueryKeys';

export type useUpdateClientActivityMutationValue = AsyncReturnType<typeof updateClientActivity>;
export type useUpdateClientActivityMutationParams = Parameters<typeof updateClientActivity>[0];

const useUpdateClientActivityMutation = (
  options?: UseMutationOptions<useUpdateClientActivityMutationValue, unknown, useUpdateClientActivityMutationParams>
): UseMutationResult<useUpdateClientActivityMutationValue, unknown, useUpdateClientActivityMutationParams> => {
  const mutation = useMutation<useUpdateClientActivityMutationValue, unknown, useUpdateClientActivityMutationParams>(
    async (updateClientActivityParameters) => {
      const updatedActivity = await updateClientActivity(updateClientActivityParameters, API);
      return updatedActivity;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([CLIENT_ACTIVITIES_QUERY_KEY]);
      },
      onError: (e: any) => {
        log(LogLevel.error, 'useUpdateClientActivityMutation', {
          label: 'useUpdateClientActivityMutation query hook',
          message: 'This is just a default message, it should always be overridden by the component',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useUpdateClientActivityMutation;
