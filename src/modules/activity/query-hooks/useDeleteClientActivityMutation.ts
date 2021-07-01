import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { deleteClientActivity } from '../activityService';
import { CLIENT_ACTIVITIES_QUERY_KEY } from './clientActivityQueryKeys';

export type useDeleteClientActivityMutationValue = AsyncReturnType<typeof deleteClientActivity>;
export type useDeleteClientActivityMutationParams = Parameters<typeof deleteClientActivity>[0];

const useDeleteClientActivityMutation = (
  options?: UseMutationOptions<useDeleteClientActivityMutationValue, unknown, useDeleteClientActivityMutationParams>
): UseMutationResult<useDeleteClientActivityMutationValue, unknown, useDeleteClientActivityMutationParams> => {
  const mutation = useMutation<useDeleteClientActivityMutationValue, unknown, useDeleteClientActivityMutationParams>(
    async (deleteClientActivityParameters) => {
      const deletedActivity = await deleteClientActivity(deleteClientActivityParameters, API);
      return deletedActivity;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([CLIENT_ACTIVITIES_QUERY_KEY]);
      },
      onError: (e: any) => {
        log(LogLevel.error, 'useDeleteClientActivityMutation', {
          label: 'useDeleteClientActivityMutation query hook',
          message: 'This is just a default message, it should always be overridden by the component',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useDeleteClientActivityMutation;
