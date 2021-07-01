import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';
import { useMutation, UseMutationResult } from 'react-query';
import { SendPasswordHandlerResponse } from 'src/modules/auth/handlers/sendPasswordHandler';
import { getAxiosSimpleError } from 'src/utils/type-utils/SimpleError';
import { agentToastResendPasswordErr, agentToastResendPasswordSuccess } from 'src/modules/agent/agentMsg';
import { AdminCreateUserCommandOutput } from '@aws-sdk/client-cognito-identity-provider';

export default function useResendEmailMutation(
  sub: string | null | undefined
): UseMutationResult<AdminCreateUserCommandOutput | undefined, unknown, void, unknown> {
  const toast = createStandaloneToast();
  return useMutation(
    async () => {
      if (sub) {
        const response = await axios.post<SendPasswordHandlerResponse>(`/api/cognito/resend/${sub}`);
        return response.data;
      } else {
        return undefined;
      }
    },
    {
      onSuccess: () => {
        toast(agentToastResendPasswordSuccess());
      },
      onError: (error) => {
        const simpleError = getAxiosSimpleError(error);
        if (simpleError) {
          toast(
            agentToastResendPasswordErr(simpleError.errorCode, {
              description: simpleError.message,
            })
          );
        }
      },
    }
  );
}
