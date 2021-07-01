import API from '@aws-amplify/api';
import { createStandaloneToast } from '@chakra-ui/react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AsyncReturnType } from 'type-fest';
import { documentToastRequestingDocumentPatchesErr } from '../documentMsg';
import { requestPatchesByDocumentId } from '../documentService';

export type UseDocumentPatchesByDocumentIdQueryResult = AsyncReturnType<typeof requestPatchesByDocumentId>;

export default function useDocumentPatchesByDocumentIdQuery(
  documentId: string | null | undefined,
  options?: UseQueryOptions<UseDocumentPatchesByDocumentIdQueryResult>
): UseQueryResult<UseDocumentPatchesByDocumentIdQueryResult> {
  const toast = createStandaloneToast();
  return useQuery<UseDocumentPatchesByDocumentIdQueryResult>(
    ['patches', documentId],
    async () => {
      if (typeof documentId === 'string') {
        return await requestPatchesByDocumentId(documentId, API);
      }
    },
    {
      refetchOnWindowFocus: false,
      onError: (e: any) => {
        const errorCode = log(
          LogLevel.error,
          e?.message ?? 'requestPatchesByDocumentId() in useDocumentPatchesByDocumentIdQuery',
          e
        );
        toast(documentToastRequestingDocumentPatchesErr(errorCode));
      },
      ...options,
    }
  );
}
