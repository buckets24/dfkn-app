import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { deleteMeeting } from '../meetingsService';
import { MEETINGS_QUERY_KEY } from './meetingQueryKeys';

export type UseDeleteMeetingMutationValue = AsyncReturnType<typeof deleteMeeting>;
export type UseDeleteMeetingMutationParams = Parameters<typeof deleteMeeting>[0];

const useDeleteMeetingMutation = (
  options?: UseMutationOptions<UseDeleteMeetingMutationValue, unknown, UseDeleteMeetingMutationParams>
): UseMutationResult<UseDeleteMeetingMutationValue, unknown, UseDeleteMeetingMutationParams> => {
  const mutation = useMutation<UseDeleteMeetingMutationValue, unknown, UseDeleteMeetingMutationParams>(
    async (deleteMeetingParameters) => {
      const deletedMeeting = await deleteMeeting(deleteMeetingParameters, API);
      return deletedMeeting;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([MEETINGS_QUERY_KEY]);
      },
      onError: (e: any) => {
        log(LogLevel.error, 'useDeleteMeetingMutation', {
          label: 'useDeleteMeetingMutation query hook',
          message: 'This is just a default message, it should always be overriden by the component',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useDeleteMeetingMutation;
