import { Box, ButtonProps, Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import { useFullscreenContext } from 'jexity-app/context/Fullscreen';
import { ExitFullscreenIcon } from 'jexity-app/icons/ExitFullscreenIcon';
import { FullscreenIcon } from 'jexity-app/icons/FullscreenIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import { ContractorType } from 'src/API';
import { extractClientInfo, requestClientById } from 'src/modules/client/clientService';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { isAgentSpecificDocument } from 'src/modules/documents/api/documentOptions';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { hasGuide } from 'src/modules/documents/document-types/getDocSchemaAndComponent';
import useCreateDocumentByClientIdMutation from 'src/modules/documents/query-hooks/useCreateDocumentByClientIdMutation';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import DocumentCreateWatcher from 'src/modules/documents/watchers/DocumentCreateWatcher';
import { BookIcon } from 'src/theme/icons/BookIcon';
import { DashboardIcon } from 'src/theme/icons/DashboardIcon';
import { DocumentSelect } from 'src/views/video-conference/Controls/DocumentSelect';
import { getMe, isAgent, useAuthStore } from '../../../modules/auth/authStore';

export const baseStyle: ButtonProps = {
  role: 'group',
  mr: 3,
  w: ['40px', null, null, null, '60px'],
  h: ['40px', null, null, null, '60px'],
  borderRadius: '100%',
  _hover: {
    bg: 'brand.primary.500',
  },
};

export const AgentClientControls: FC = memo(() => {
  const { fullscreen, setFullscreen } = useFullscreenContext();

  const router = useRouter();
  const clientId = router.query.id as string;
  const documents = useDocumentsByClientIdQuery(clientId);
  const me = useAuthStore(getMe);
  const activeDocumentId = router.query.documentId as string;
  const showGuide = useDocumentGuidePosition((s) => s.showGuide);
  const toggleShowGuide = useDocumentGuidePosition((s) => s.toggleShowGuide);

  const clientResponse = useClientByIdQuery(clientId, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const createDocumentMutation = useCreateDocumentByClientIdMutation(clientId);

  const documentQuery = useDocumentByIdQuery(activeDocumentId);
  const document = documentQuery.data;

  return (
    <Grid
      templateColumns={['repeat(2, 1fr)']}
      alignItems="center"
      px={[5, null, null, 10]}
      h={['60px', null, null, null, '90px']}
      bg="gray.100"
    >
      <Box w="0">
        {/* TODO: Replace async here with swr or react-query to support isLoading, isError and data */}
        <DocumentSelect
          documents={documents.data}
          closeOnSelect
          placement="top-start"
          onSelectType={async (document, contractor = ContractorType.PRIMARY) => {
            try {
              if (!!clientId && me && isAgent(me)) {
                const existingDocument = documents.data?.find(
                  (doc) => doc.type === document.type && clientId === doc.clientId
                );

                if (existingDocument) {
                  await router.push(`/agent/clients/${clientId}/documents/${existingDocument.id}`);
                } else {
                  /**
                   * Requesting the updated client by id
                   *
                   * TODO: This might not be necessary since up above we have a useQuery that
                   * looks for the client. To make sure it is up to date though maybe it is best
                   * to have a watcher/subscription somewhere.
                   */
                  const client = await requestClientById(clientId);

                  if (client && me.sub) {
                    const editors = [me.sub];
                    /**
                     * Only push the client.sub if the document that will be
                     * created is not included on the RBS Documents Array.
                     */
                    if (!isAgentSpecificDocument(document.type) && client.sub) {
                      editors.push(client.sub);
                    }

                    const createdDocument = await createDocumentMutation.mutateAsync(
                      [
                        client,
                        document.type,
                        document.title,
                        me.sub,
                        extractClientInfo(client, contractor),
                        contractor,
                        editors,
                      ],
                      {
                        // TODO Handle errors
                      }
                    );
                    if (createdDocument) {
                      log(LogLevel.info, 'CREATE_DOCUMENT', {
                        label: 'AgentClientControls',
                        message: `${document.type} document with an id of ${createdDocument.id} was successfully created`,
                      });
                      // void documents.refetch();
                      await router.push(`/agent/clients/${clientId}/documents/${createdDocument.id}`);
                    } else {
                      /**
                       * TODO Show an error message
                       */
                    }
                  }
                }
              }
            } catch (e) {
              log(
                LogLevel.error,
                e.message ?? 'requestClientBySub() or createDocument () or pushDocument() in AgentClientControls',
                e
              );
            }
          }}
        />
      </Box>
      {me?.sub && clientResponse.data?.sub && <DocumentCreateWatcher editors={[me.sub, clientResponse.data.sub]} />}
      <Flex ml="auto" fontSize="md" placeItems="center" color="black">
        <Flex role="group" aria-label="Zurück" alignItems="center" outline={0}>
          <Text fontSize="md" color="black">
            Zurück zum Dashboard
          </Text>
          <IconButton
            ml={4}
            aria-label="Return to dashboard"
            {...baseStyle}
            color="black"
            bg="gray.600"
            alignItems="center"
            justifyContent="center"
            _groupHover={{ color: 'white', bg: 'brand.primary.500' }}
            onClick={() => router.push(`/agent/clients/${clientId}/documents`)}
          >
            <DashboardIcon width={['16px', null, null, null, '24px']} height="auto" color="inherit" />
          </IconButton>
        </Flex>
        {document && hasGuide.includes(document.type) && (
          <IconButton
            {...baseStyle}
            aria-label="Fullscreen"
            icon={<BookIcon />}
            bg={showGuide ? 'brand.primary.500' : 'gray.600'}
            color={showGuide ? 'white' : undefined}
            onClick={toggleShowGuide}
          />
        )}
        <IconButton
          {...baseStyle}
          mr={0}
          bg="gray.600"
          aria-label="Fullscreen"
          icon={
            !fullscreen ? (
              <FullscreenIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                _groupHover={{ color: 'white' }}
              />
            ) : (
              <ExitFullscreenIcon
                width={['12px', null, null, null, '18px']}
                height="auto"
                _groupHover={{ color: 'white' }}
              />
            )
          }
          onClick={() => {
            setFullscreen(!fullscreen);
          }}
        />
      </Flex>
    </Grid>
  );
});
