import { API } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { createMeeting } from '../meetingsService';
import { MEETINGS_QUERY_KEY } from './meetingQueryKeys';

export type UseCreateMeetingMutationValue = AsyncReturnType<typeof createMeeting>;
export type UseCreateMeetingMutationParams = Parameters<typeof createMeeting>[0];

const useCreateMeetingMutation = (
  options?: UseMutationOptions<UseCreateMeetingMutationValue, unknown, UseCreateMeetingMutationParams>
): UseMutationResult<UseCreateMeetingMutationValue, unknown, UseCreateMeetingMutationParams> => {
  const mutation = useMutation<UseCreateMeetingMutationValue, unknown, UseCreateMeetingMutationParams>(
    async (createMeetingParameters) => {
      const createdMeeting = await createMeeting(createMeetingParameters, API);
      return createdMeeting;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([MEETINGS_QUERY_KEY]);
      },
      onError: (e: any) => {
        log(LogLevel.error, 'useCreateMeetingMutation', {
          label: 'useCreateMeetingMutation query hook',
          message: 'This is just a default message, it should always be overriden by the component',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useCreateMeetingMutation;
