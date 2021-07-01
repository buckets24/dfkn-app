import { GraphQLAPIClass } from '@aws-amplify/api-graphql';
import { Box, Heading } from '@chakra-ui/react';
import { withSSRContext } from 'aws-amplify';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { GetServerSideProps } from 'next';
import React, { FC } from 'react';
import 'src/AmplifyConfig';
import getDocSchemaAndComponent from 'src/modules/documents/document-types/getDocSchemaAndComponent';
import { DocumentFormProvider } from 'src/modules/documents/DocumentFormProvider';
import { requestArchivedDocumentById } from 'src/modules/documents/documentService';
import { PromiseValue } from 'type-fest';

interface PrintProps {
  archivedDocument: PromiseValue<ReturnType<typeof requestArchivedDocumentById>> | null;
}

const Print: FC<PrintProps> = ({ archivedDocument }) => {
  if (!archivedDocument) {
    console.error('Empty document was passed from serverside props of print page');
    return <Heading>Kein Dokument gefunden oder Sie sind nicht autorisiert das Dokument zu sehen. </Heading>;
  }

  /**
   * Query the document data here, but since we don't we'll
   * just access the default values in the store
   */
  const { documentComponent, documentSchema } = getDocSchemaAndComponent(archivedDocument.type);

  const initValues = JSON.parse(archivedDocument.values);

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
          <DocumentFormProvider
            printMode
            activeDocumentId={archivedDocument.id}
            schema={documentSchema}
            initialValues={initValues}
          >
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

  let document: PrintProps['archivedDocument'];

  try {
    document = await requestArchivedDocumentById(documentId, API);
    if (!document) {
      throw new Error(`Archived document with id ${documentId} not found`);
    }
  } catch (e) {
    log(LogLevel.error, e.message, e);
    return {
      props: {
        error: e,
      },
    };
  }
  return {
    props: {
      archivedDocument: document,
    },
  };
};
export default Print;
