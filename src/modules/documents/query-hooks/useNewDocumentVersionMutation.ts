import API from '@aws-amplify/api';
import { createStandaloneToast } from '@chakra-ui/toast';
import axios, { AxiosResponse } from 'axios';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { ContractorType } from 'src/API';
import { NewVersionHandlerResponse } from 'src/pages/api/documents/new-version/[documentId]';
import queryClient from 'src/queryClient';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { documentToastNewDocumentVersionErr } from '../documentMsg';
import { DOCUMENTS_QUERY_KEY } from './documentQueryKeys';

type NewVersionProps = {
  documentId: string;
  contractorType: ContractorType;
};

export type UseNewDocumentVersionMutationValue = AxiosResponse<NewVersionHandlerResponse>;

const useNewDocumentVersionMutation = (
  agentId: string | null | undefined,
  options?: UseMutationOptions<UseNewDocumentVersionMutationValue, SimpleError, NewVersionProps>
): UseMutationResult<UseNewDocumentVersionMutationValue, SimpleError, NewVersionProps> => {
  const toast = createStandaloneToast();
  const mutation = useMutation<UseNewDocumentVersionMutationValue, SimpleError, NewVersionProps>(
    async (newDocumentVersionParameters) => {
      return await axios.post<NewVersionHandlerResponse>(
        `/api/documents/new-version/${newDocumentVersionParameters.documentId}?contractor=${newDocumentVersionParameters.contractorType}`
      );
    },
    {
      onSuccess: () => {
        if (agentId) {
          void queryClient.refetchQueries([DOCUMENTS_QUERY_KEY]);
        }
      },
      onError: (e) => {
        const errorCode = log(LogLevel.error, e.message, e);
        toast(documentToastNewDocumentVersionErr(errorCode));
      },
      ...options,
    }
  );
  return mutation;
};

export default useNewDocumentVersionMutation;
