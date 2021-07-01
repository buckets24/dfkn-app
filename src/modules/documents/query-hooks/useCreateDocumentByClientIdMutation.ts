import { createStandaloneToast } from '@chakra-ui/toast';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { AsyncReturnType } from 'type-fest';
import { createDocument } from '../documentService';
import { CLIENT_DOCUMENTS_QUERY_KEY } from './documentQueryKeys';

export type UseCreateDocumentMutationValue = AsyncReturnType<typeof createDocument>;
export type UseCreateDocumentMutationParams = Parameters<typeof createDocument>;
/**
 *
 * @param clientId We require clientId to reset th cache, we always request documents by clientId
 * @param options
 * @returns
 */
const useCreateDocumentByClientIdMutation = (
  clientId: string | null | undefined,
  options?: UseMutationOptions<UseCreateDocumentMutationValue, unknown, UseCreateDocumentMutationParams>
): UseMutationResult<UseCreateDocumentMutationValue, unknown, UseCreateDocumentMutationParams> => {
  const toast = createStandaloneToast();
  const mutation = useMutation<UseCreateDocumentMutationValue, unknown, UseCreateDocumentMutationParams>(
    async (createDocumentParameters) => {
      const createdDocument = await createDocument(...createDocumentParameters);
      return createdDocument;
    },
    {
      onSuccess: () => {
        if (clientId) {
          void queryClient.refetchQueries([CLIENT_DOCUMENTS_QUERY_KEY, clientId]);
        }
      },
      onError: () => {
        // TODO Create generic error for handling failed document create Operations
      },
      ...options,
    }
  );
  return mutation;
};

export default useCreateDocumentByClientIdMutation;
