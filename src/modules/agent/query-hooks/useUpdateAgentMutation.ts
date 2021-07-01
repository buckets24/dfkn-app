import { API } from 'aws-amplify';
import axios from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { requestAgentById, updateAgent } from '../agentService';
import { AGENTS_QUERY_KEY } from './agentQueryKeys';

export type UseUpdateAgentMutationValue = AsyncReturnType<typeof updateAgent>;
export type UseUpdateAgentMutationParams = Parameters<typeof updateAgent>[0];

const useUpdateAgentMutation = (
  initialAgent: AsyncReturnType<typeof requestAgentById>,
  options?: UseMutationOptions<UseUpdateAgentMutationValue, unknown, UseUpdateAgentMutationParams>
): UseMutationResult<UseUpdateAgentMutationValue, unknown, UseUpdateAgentMutationParams> => {
  const mutation = useMutation<UseUpdateAgentMutationValue, unknown, UseUpdateAgentMutationParams>(
    async (updateAgentParameters) => {
      if (initialAgent && initialAgent.role !== updateAgentParameters.role) {
        await axios.put(`/api/agents/group/${initialAgent.email}`, {
          oldRole: initialAgent.role,
          newRole: updateAgentParameters.role,
        });
      }

      const updatedAgent = await updateAgent(updateAgentParameters, API);
      return updatedAgent;
    },
    {
      onSettled: () => {
        void queryClient.invalidateQueries([AGENTS_QUERY_KEY]);
      },
      onError: (e: any) => {
        log(LogLevel.error, 'useUpdateAgentMutation', {
          label: 'useUpdateAgentMutation query hook',
          message: 'This is just a default message, it should always be overriden by the component',
          ...e,
        });
      },
      ...options,
    }
  );
  return mutation;
};

export default useUpdateAgentMutation;
