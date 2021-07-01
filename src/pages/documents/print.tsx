import { GraphQLAPIClass } from '@aws-amplify/api-graphql';
import { Box, Heading } from '@chakra-ui/react';
import { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import 'src/AmplifyConfig';
import { DocumentPatchModel } from 'src/modules/documents/api/DocumentModel';
import getDocSchemaAndComponent from 'src/modules/documents/document-types/getDocSchemaAndComponent';
import { DocumentFormProvider } from 'src/modules/documents/DocumentFormProvider';
import { requestArchivedDocumentById, requestDocumentWithPatchesById } from 'src/modules/documents/documentService';
import { DOCUMENTS_QUERY_KEY } from 'src/modules/documents/query-hooks/documentQueryKeys';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import patcher from 'src/modules/documents/utils/patcher';
import queryClient from 'src/queryClient';
import { AsyncReturnType, PromiseValue } from 'type-fest';

interface PrintProps {
  document: NonNullable<AsyncReturnType<typeof requestDocumentWithPatchesById>> | null;
  documentPatches?: DocumentPatchModel[];
  archivedDocument?: PromiseValue<ReturnType<typeof requestArchivedDocumentById>> | null;
}

const Print: FC<PrintProps> = ({ document, documentPatches = [], archivedDocument }) => {
  useDocumentByIdQuery(document?.id, { initialData: document });

  if (!document && !archivedDocument) {
    console.error('Empty document was passed from serverside props of print page');
    return <Heading>Kein Dokument gefunden oder Sie sind nicht autorisiert das Dokument zu sehen. </Heading>;
  }

  let initValues;
  let documentComponent: ReturnType<typeof getDocSchemaAndComponent>['documentComponent'] = undefined;
  let documentSchema: ReturnType<typeof getDocSchemaAndComponent>['documentSchema'] | undefined = undefined;
  if (document) {
    const d = getDocSchemaAndComponent(document.type);
    documentComponent = d.documentComponent;
    documentSchema = d.documentSchema;
    initValues = patcher(document.values, documentPatches);
  }

  if (archivedDocument) {
    const d = getDocSchemaAndComponent(archivedDocument.type);
    documentComponent = d.documentComponent;
    documentSchema = d.documentSchema;
    initValues = JSON.parse(archivedDocument.values);
  }

  const docId = document?.id ?? archivedDocument?.id;

  if (!docId) {
    log(LogLevel.error, 'Missing document id, this is impossible', {
      label: 'PRINT_TSX_MISSING_DOC_ID',
      message: 'This is impossible, but typescript complains',
    });
    return <Heading>Kein Dokument gefunden oder Sie sind nicht autorisiert das Dokument zu sehen. </Heading>;
  }

  queryClient.setQueryData([DOCUMENTS_QUERY_KEY, docId], document ?? archivedDocument);

  return (
    <>
      <Box minH="100%" backgroundColor="white" overflow="hidden">
        <style jsx global>
          {`
            @page {
              margin: 0;
            }
          `}
        </style>
        {documentComponent && documentSchema && (
          <DocumentFormProvider printMode activeDocumentId={docId} schema={documentSchema} initialValues={initValues}>
            {documentComponent}
          </DocumentFormProvider>
        )}
      </Box>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<PrintProps | { error: string }> = async (context) => {
  const { API: APISSR } = withSSRContext(context);
  const API = APISSR as GraphQLAPIClass;
  const documentId = context.query.documentId as string;

  let resDocument: AsyncReturnType<typeof requestDocumentWithPatchesById>;
  const patchesAsArray: DocumentPatchModel[] = [];

  try {
    resDocument = await requestDocumentWithPatchesById(documentId, API);

    const patches = resDocument?.patches?.items;
    if (patches) {
      Object.values(patches).forEach((patch) => {
        if (!!patch && patch.documentId === documentId) {
          patchesAsArray.push(patch);
        }
      });
      patchesAsArray.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA > dateB ? 1 : -1;
      });
    }
  } catch (e) {
    log(LogLevel.error, e.message, e);
    return {
      props: {
        error: e,
      },
    };
  }

  let archivedDocument: PrintProps['archivedDocument'];
  if (!resDocument) {
    archivedDocument = await requestArchivedDocumentById(documentId, API);
  }

  let output: PrintProps['document'] = null;
  if (resDocument) {
    output = {
      ...resDocument,
      patches: {
        __typename: 'ModelDocumentPatchConnection',
        items: resDocument.patches?.items ?? null,
        nextToken: resDocument.patches?.nextToken ?? null,
      },
    };
  }

  return {
    props: {
      document: output,
      documentPatches: patchesAsArray,
      archivedDocument: archivedDocument ?? null,
    },
  };
};
export default Print;
