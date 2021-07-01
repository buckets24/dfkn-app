import { createStandaloneToast } from '@chakra-ui/react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { AsyncReturnType } from 'type-fest';
import { documentToastRequestingDocumentErr } from '../documentMsg';
import { requestOnlineDocumentsWithLatestPatchByClientId } from '../documentService';
import { CLIENT_DOCUMENTS_QUERY_KEY } from './documentQueryKeys';

/**
 * Gets all the documents of a given client. The documents will only contain the latest patch
 * which is used to indicate the last updated value.
 * @param clientId - Client id of the documents
 */

export type UseDocumentsByClientIdQueryResult = AsyncReturnType<typeof requestOnlineDocumentsWithLatestPatchByClientId>;

export default function useDocumentsByClientIdQuery(
  clientId: string | undefined | null,
  options?: UseQueryOptions<UseDocumentsByClientIdQueryResult>
): UseQueryResult<UseDocumentsByClientIdQueryResult> {
  const toast = createStandaloneToast();
  return useQuery<UseDocumentsByClientIdQueryResult>(
    [CLIENT_DOCUMENTS_QUERY_KEY, clientId],
    async () => {
      if (typeof clientId === 'string') {
        return await requestOnlineDocumentsWithLatestPatchByClientId(clientId);
      }
    },
    {
      refetchOnWindowFocus: false,
      onError: (e: any) => {
        const errorCode = log(
          LogLevel.error,
          e?.message ?? 'requestOnlineDocumentsWithLatestPatchByClientId() in useDocumentsQuery',
          e
        );
        toast(documentToastRequestingDocumentErr(errorCode));
      },
      ...options,
    }
  );
}
