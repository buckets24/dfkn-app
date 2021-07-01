import API from '@aws-amplify/api';
import { createStandaloneToast } from '@chakra-ui/toast';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import queryClient from 'src/queryClient';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { AsyncReturnType } from 'type-fest';
import { documentToastUpdateDocumentErr } from '../documentMsg';
import { updateDocument } from '../documentService';
import { DOCUMENTS_QUERY_KEY } from './documentQueryKeys';

export type UseUpdateDocumentMutationValue = AsyncReturnType<typeof updateDocument>;
export type UseUpdateDocumentMutationParams = Parameters<typeof updateDocument>[0];

const useUpdateDocumentMutation = (
  id: string | null | undefined,
  options?: UseMutationOptions<UseUpdateDocumentMutationValue, SimpleError, UseUpdateDocumentMutationParams>
): UseMutationResult<UseUpdateDocumentMutationValue, SimpleError, UseUpdateDocumentMutationParams> => {
  const toast = createStandaloneToast();
  const mutation = useMutation<UseUpdateDocumentMutationValue, SimpleError, UseUpdateDocumentMutationParams>(
    async (updateDocumentParameters) => {
      return await updateDocument(updateDocumentParameters, API);
    },
    {
      onSuccess: () => {
        if (id) {
          void queryClient.refetchQueries([DOCUMENTS_QUERY_KEY]);
        }
      },
      onError: (e) => {
        const errorCode = log(LogLevel.error, e.message, e);
        toast(documentToastUpdateDocumentErr(errorCode));
      },
      ...options,
    }
  );
  return mutation;
};

export default useUpdateDocumentMutation;
