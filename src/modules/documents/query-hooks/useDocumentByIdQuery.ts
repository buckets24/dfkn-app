import API from '@aws-amplify/api';
import { createStandaloneToast } from '@chakra-ui/react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AsyncReturnType } from 'type-fest';
import { documentToastRequestingDocumentErr } from '../documentMsg';
import { requestDocumentWithPatchesById } from '../documentService';
import { ACTIVE_DOCUMENT_QUERY_KEY } from './documentQueryKeys';

export type UseDocumentByIdQueryValue = AsyncReturnType<typeof requestDocumentWithPatchesById>;
/**
 * Returns the document with all it's patches included.
 */
export default function useDocumentByIdQuery(
  documentId: string | undefined | null,
  options?: UseQueryOptions<UseDocumentByIdQueryValue>
): UseQueryResult<UseDocumentByIdQueryValue> {
  const toast = createStandaloneToast();
  return useQuery<UseDocumentByIdQueryValue>(
    [ACTIVE_DOCUMENT_QUERY_KEY, documentId],
    async () => {
      if (typeof documentId === 'string') {
        return await requestDocumentWithPatchesById(documentId, API);
      }
    },
    {
      refetchOnWindowFocus: false,
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e?.message ?? 'requestDocumentById() in useDocumentByIdQuery', e);
        toast(documentToastRequestingDocumentErr(errorCode));
      },
      ...options,
    }
  );
}
