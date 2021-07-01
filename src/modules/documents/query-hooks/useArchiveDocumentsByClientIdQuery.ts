import { GraphQLAPIClass } from '@aws-amplify/api-graphql';
import { createStandaloneToast } from '@chakra-ui/react';
import { APIClass } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { PromiseValue } from 'type-fest';
import { documentToastRequestingDocumentErr } from '../documentMsg';
import { requestArchivedDocumentsByClientId } from '../documentService';
import { ARCHIVE_DOCUMENTS_QUERY_KEY } from './documentQueryKeys';

type RequestArchivedDocumentsResult = PromiseValue<ReturnType<typeof requestArchivedDocumentsByClientId>>;

export function useArchiveDocumentsByClientIdQuery(
  clientId: string | undefined | null,
  API: GraphQLAPIClass | APIClass,
  options?: UseQueryOptions<RequestArchivedDocumentsResult, unknown>
): UseQueryResult<PromiseValue<ReturnType<typeof requestArchivedDocumentsByClientId>> | undefined> {
  const toast = createStandaloneToast();
  return useQuery<RequestArchivedDocumentsResult, unknown>(
    [ARCHIVE_DOCUMENTS_QUERY_KEY, clientId],
    async () => {
      if (typeof clientId === 'string') {
        return await requestArchivedDocumentsByClientId(clientId, API);
      } else {
        return undefined;
      }
    },
    {
      refetchOnWindowFocus: false,
      onError: (e: any) => {
        const errorCode = log(LogLevel.error, e?.message ?? 'requestDocumentsByClientId() in useDocumentsQuery', e);
        toast(documentToastRequestingDocumentErr(errorCode));
      },
      ...options,
    }
  );
}
