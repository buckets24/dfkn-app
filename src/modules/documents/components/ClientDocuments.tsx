import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Grid,
  Heading,
  HStack,
  Link,
  List,
  SimpleGrid,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import axios from 'axios';
import Card from 'jexity-app/card/Card';
import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import { ContractorType, OnlineDocumentStatus } from 'src/API';
import { CLIENTS_QUERY_KEY } from 'src/modules/client/query-hooks/clientQueryKeys';
import useUpdateClientMutation from 'src/modules/client/query-hooks/useUpdateClientMutation';
import {
  documentOptions,
  isAgentSpecificDocument,
  immosparenProportionalInvestmentDocuments,
  immosparenOneTimeInvestmentDocuments,
} from 'src/modules/documents/api/documentOptions';
import { PrintResponse } from 'src/modules/documents/api/generatePDF';
import {
  documentNewVersionToastCreateErr,
  documentToastDownloadErr,
  documentToastRequestingDocumentErr,
  documentToastUpdateDocumentVisibleToClientErr,
  documentToastUpdateDocumentVisibleToClientSuccess,
} from 'src/modules/documents/documentMsg';
import { deleteArchivedDocument } from 'src/modules/documents/documentService';
import { useArchiveDocumentsByClientIdQuery } from 'src/modules/documents/query-hooks/useArchiveDocumentsByClientIdQuery';
import useCreateDocumentByClientIdMutation from 'src/modules/documents/query-hooks/useCreateDocumentByClientIdMutation';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import useNewDocumentVersionMutation from 'src/modules/documents/query-hooks/useNewDocumentVersionMutation';
import useUpdateDocumentMutation from 'src/modules/documents/query-hooks/useUpdateDocumentMutation';
import downloadURI from 'src/modules/documents/utils/downloadUri';
import DocumentCreateWatcher from 'src/modules/documents/watchers/DocumentCreateWatcher';
import DocumentUpdateWatcher from 'src/modules/documents/watchers/DocumentUpdateWatcher';
import queryClient from 'src/queryClient';
import { DownloadIcon } from 'src/theme/icons/DownloadIcon';
import { SquarePlusIcon } from 'src/theme/icons/SquarePlusIcon';
import {
  AgentClientArchivedDocumentOptions,
  AgentClientDocumentOptions,
} from 'src/views/agents/document-options/AgentClientDocumentOptions';
import { DocumentSelect } from 'src/views/video-conference/Controls/DocumentSelect';
import { getMe, isAgent, useAuthStore } from '../../auth/authStore';
import { extractClientInfo, requestClientById } from '../../client/clientService';
import useClientByIdQuery, { UseClientByIdQueryValue } from '../../client/query-hooks/useClientByIdQuery';
import { ClientDocumentListItem } from './ClientDocumentListItem';
import NextLink from 'next/link';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { DocumentIncompleteIcon } from 'src/theme/icons/DocumentIncompleteIcon';
import { LockIcon } from 'jexity-app/icons/LockIcon';
import { ArchiveIcon } from 'jexity-app/icons/ArchiveIcon';
import { PDFIcon } from 'src/theme/icons/PDFIcon';

export const ClientDocuments: FC = () => {
  const me = useAuthStore(getMe);
  const router = useRouter();
  const clientId = router.query.id;
  const toast = useToast();

  if (typeof clientId !== 'string') {
    throw new Error(`Can't render ClientDocuments since clientId is not not a string`);
  }

  const documents = useDocumentsByClientIdQuery(clientId, { enabled: false });
  const clientResponse = useClientByIdQuery(clientId, {
    enabled: false,
    refetchOnWindowFocus: false,
  });
  const productInfoImmposparen = clientResponse.data?.productInfoImmposparen;
  const immosparenDocuments = [
    ...(productInfoImmposparen?.proportionalInvestment ? immosparenProportionalInvestmentDocuments : []),
    ...(productInfoImmposparen?.oneTimeInvestment ? immosparenOneTimeInvestmentDocuments : []),
  ];

  const archivedDocuments = useArchiveDocumentsByClientIdQuery(clientId, API, {
    enabled: false,
  });
  const createDocumentMutation = useCreateDocumentByClientIdMutation(clientId);

  const docOptions = documentOptions.filter((docOption) => {
    if (documents.data) {
      const existingTypes = documents.data
        .filter((doc) => doc.clientId === clientId)
        .map((doc) => {
          return doc.type;
        });
      return !existingTypes.includes(docOption.type);
    }
  });

  const handleEditDocument = useCallback<(documentId: string) => void>(
    (documentId) => {
      void router.push(`/agent/clients/${clientId}/documents/${documentId}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  const deleteDocument = useMutation(async (documentId: string) => {
    return await deleteArchivedDocument(documentId, API);
  });

  const updateDocumentMutation = useUpdateDocumentMutation(me?.id);
  const newDocumentVersionMutation = useNewDocumentVersionMutation(me?.id);

  const sortedDocuments =
    documents.data?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) ?? [];
  const sortedArchivedDocuments =
    archivedDocuments.data?.sort((a, b) => {
      if (a && b) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return 0;
      }
    }) ?? archivedDocuments.data;

  const onToggleVisibilityToClient = async (documentId: string, isVisible: boolean) => {
    try {
      await updateDocumentMutation.mutateAsync({
        id: documentId,
        isVisibleToClient: !isVisible,
      });

      toast(documentToastUpdateDocumentVisibleToClientSuccess());
    } catch (e) {
      const errorCode = log(LogLevel.error, e, {
        label: 'AgentClientDocumentToggleVisibility',
        ...e,
      });
      toast(documentToastUpdateDocumentVisibleToClientErr(errorCode));
    } finally {
      void documents.refetch();
    }
  };

  const updateClientMutation = useUpdateClientMutation({
    onSuccess: async (responseData) => {
      if (responseData) {
        toast(documentToastUpdateDocumentVisibleToClientSuccess());
        void queryClient.setQueryData<UseClientByIdQueryValue>([CLIENTS_QUERY_KEY, responseData.id], responseData);
      }
    },
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e.message, { label: 'UpdateClientMutation', ...e });
      toast(documentToastUpdateDocumentVisibleToClientErr(errorCode));
    },
  });

  const toggleImmosparenProducts = async (type: 'proportionalInvestment' | 'oneTimeInvestment') => {
    if (clientResponse.data) {
      await updateClientMutation.mutateAsync({
        id: clientResponse.data.id,
        productInfoImmposparen: {
          ...clientResponse.data.productInfoImmposparen,
          [type]: !clientResponse.data.productInfoImmposparen?.[type],
        },
      });
    }
  };

  useEffect(() => {
    const req = async () => {
      if (typeof clientId === 'string') {
        void documents.refetch();
      }
    };
    req().catch((e) => {
      const errorCode = log(LogLevel.error, e, { label: 'ClientDocuments', ...e });
      toast(documentToastRequestingDocumentErr(errorCode));
    });
    /**
     * Temporary solution for triggering updates, since the compnoent DocumentUpdateWatcher
     * does not work, for now we detect changes in this effect via archivedDocuments.data.length
     * and lockDocument.data
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast, archivedDocuments.data?.length, updateDocumentMutation.data]);

  return (
    <Grid templateColumns={['1fr', null, null, null, 'repeat(auto-fit, minmax(647px, 1fr))']} gap={8}>
      <Box>
        <Card p={6} pt={10} mb={6}>
          <SimpleGrid templateColumns="1fr min-content">
            <Heading as="h3" size="md" fontFamily="body">
              Online Dokumente
            </Heading>
            {docOptions.length > 0 && (
              <DocumentSelect
                showDocumentStatus={false}
                documents={documents.data}
                customPopupTrigger={
                  <Button
                    variant="ghost"
                    color="brand.primary.500"
                    _hover={{
                      bg: 'brand.primary.500',
                      color: 'white',
                    }}
                  >
                    Dokument hinzufügen
                    <SquarePlusIcon ml={2} />
                  </Button>
                }
                label="Add document"
                options={docOptions}
                placement="bottom"
                closeOnSelect
                onSelectType={async (document, contractor = ContractorType.PRIMARY) => {
                  try {
                    const existingDocument = documents.data?.find((doc) => doc.type === document.type);
                    if (existingDocument) {
                      // Do nothing
                    } else {
                      if (me && typeof clientId === 'string') {
                        /**
                         * Requesting the updated client by id
                         */
                        const client = await requestClientById(clientId);

                        if (client && isAgent(me) && me.sub) {
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
                              // TODO Handle errors here
                            }
                          );
                          if (createdDocument) {
                            log(LogLevel.info, 'CREATE_DOCUMENT', {
                              label: 'ClientDocument',
                              message: `${document.type} document with an id of ${createdDocument.id} was successfully created`,
                            });
                          }
                        }
                      }
                    }
                  } catch (e) {
                    log(
                      LogLevel.error,
                      e.message ?? 'requestClientBySub() or createDocument () or pushDocument() in ClientDocuments',
                      e
                    );
                  }
                }}
              />
            )}
          </SimpleGrid>
          {sortedDocuments.length > 0 && <Divider mt={4} />}
          {me?.sub && clientResponse.data?.sub && <DocumentCreateWatcher editors={[me.sub, clientResponse.data.sub]} />}
          {me?.sub && clientResponse.data?.sub && <DocumentUpdateWatcher editors={[me.sub, clientResponse.data.sub]} />}
          <List ml={3}>
            {sortedDocuments.map(
              ({ id, status, title, type, updatedAt, version, contractor, patches, isVisibleToClient }, i) => {
                let lastUpdated = updatedAt;

                if (patches?.items && patches.items.length > 0) {
                  const latestPatch = patches.items.filter(removeEmptyArrayItems)[0].createdAt;
                  if (latestPatch) {
                    lastUpdated = latestPatch;
                  }
                }

                return (
                  <ClientDocumentListItem
                    key={i}
                    showLabel={i === 0}
                    statusIcon={
                      <>
                        {status === OnlineDocumentStatus.COMPLETE && <CheckIcon color="support.success.500" />}
                        {status === OnlineDocumentStatus.INCOMPLETE && (
                          <DocumentIncompleteIcon color="brand.primary.500" />
                        )}
                        {status === OnlineDocumentStatus.LOCK && <LockIcon color="brand.tertiary.500" />}
                      </>
                    }
                    title={
                      <span>
                        {title} <Badge colorScheme="blue">{`v.${version ?? 1}`}</Badge>
                      </span>
                    }
                    category={documentOptions.find((document) => document.type === type)?.productGroup}
                    updatedAt={lastUpdated}
                    subtitle={`${contractor === 'SECONDARY' ? '2. ' : '1. '}Vertragspartner`}
                    shortcutActionLabel={i === 0 ? 'Sichbar für' : ''}
                    shortcutActions={() => (
                      <Box>
                        <Grid templateColumns="repeat(2, 40px)" justifyItems="center" alignItems="center" gap={3}>
                          <Avatar
                            size="sm"
                            name="Berater"
                            bg="brand.primary.500"
                            color="white"
                            fontSize={['sm', null, null, '14px']}
                          />

                          {!isAgentSpecificDocument(type) && (
                            <Button
                              variant="unstyled"
                              onClick={() => onToggleVisibilityToClient(id, !!isVisibleToClient)}
                              _hover={{
                                cursor: 'pointer',
                              }}
                              borderRadius="50%"
                            >
                              <Tooltip
                                label="Sichtbarkeit umschalten"
                                bg="brand.primary.500"
                                aria-label="Visibility Toggler"
                                hasArrow
                              >
                                <Avatar
                                  size="sm"
                                  name="Kunde"
                                  bg={isVisibleToClient ? 'brand.primary.500' : 'gray.400'}
                                  color="white"
                                  fontSize={['sm', null, null, '14px']}
                                  _hover={{
                                    bg: !isVisibleToClient ? 'brand.primary.500' : 'brand.primary.900',
                                    cursor: 'pointer',
                                  }}
                                />
                              </Tooltip>
                            </Button>
                          )}
                        </Grid>
                      </Box>
                    )}
                    actions={
                      <AgentClientDocumentOptions
                        documentType={type}
                        documentIsLocked={status === OnlineDocumentStatus.LOCK}
                        onLockDocument={async () => {
                          await updateDocumentMutation.mutateAsync({
                            id: id,
                            status: OnlineDocumentStatus.LOCK,
                          });
                          await archivedDocuments.refetch();
                        }}
                        onNewVersion={async (contractorType, setIsLoading) => {
                          try {
                            setIsLoading(true);
                            await newDocumentVersionMutation.mutateAsync({
                              documentId: id,
                              contractorType: contractorType,
                            });
                            await archivedDocuments.refetch();
                          } catch (e) {
                            const errorCode = log(LogLevel.error, e, {
                              label: 'AgentClientDocumentOptionsOnNewVersion',
                              ...e,
                            });
                            toast(documentNewVersionToastCreateErr(errorCode));
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                        onClickEditDocument={() => handleEditDocument(id)}
                        onDownload={async (setIsLoading) => {
                          try {
                            setIsLoading(true);
                            // Download PDf
                            const response = await axios.get<PrintResponse>(`/api/documents/print?documentId=${id}`);
                            downloadURI(response.data.dataUrl, title);
                          } catch (e) {
                            const errorCode = log(LogLevel.error, e, {
                              label: 'AgentClientDocumentOptionsOnDownload',
                              ...e,
                            });
                            toast(documentToastDownloadErr(errorCode));
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                      />
                    }
                  />
                );
              }
            )}
          </List>
        </Card>

        {sortedArchivedDocuments && sortedArchivedDocuments.length > 0 && (
          <Card p={6} pt={10} mb={6}>
            <Heading as="h3" size="md" fontFamily="body">
              Archivierte Dokumente
            </Heading>
            <Divider mt={4} />
            <List ml={3}>
              {sortedArchivedDocuments.filter(removeEmptyArrayItems).map((archivedDocument, i) => {
                const { title, type, updatedAt, version, contractor, id } = archivedDocument;

                return (
                  <ClientDocumentListItem
                    key={i}
                    showLabel={i === 0}
                    statusIcon={<ArchiveIcon />}
                    title={
                      <span>
                        {title} <Badge colorScheme="blue">{`v.${version}`}</Badge>
                      </span>
                    }
                    category={documentOptions.find((document) => document.type === type)?.productGroup}
                    updatedAt={updatedAt}
                    subtitle={`${contractor === 'SECONDARY' ? '2. ' : '1. '}Vertragspartner`}
                    shortcutActionLabel={i === 0 ? 'Sichbar für' : ''}
                    shortcutActions={() => (
                      <Box>
                        <Grid templateColumns="repeat(2, 40px)" justifyItems="center" alignItems="center" gap={3}>
                          <Avatar
                            size="sm"
                            name="Berater"
                            bg="brand.primary.500"
                            color="white"
                            fontSize={['sm', null, null, '14px']}
                          />
                          <Avatar
                            size="sm"
                            name="Kunde"
                            bg="brand.primary.500"
                            color="white"
                            fontSize={['sm', null, null, '14px']}
                          />
                        </Grid>
                      </Box>
                    )}
                    actions={
                      <AgentClientArchivedDocumentOptions
                        onDownload={async (setIsLoading) => {
                          try {
                            setIsLoading(true);
                            // Download PDf
                            const response = await axios.get<PrintResponse>(`/api/documents/print?documentId=${id}`);
                            downloadURI(response.data.dataUrl, title);
                          } catch (e) {
                            const errorCode = log(LogLevel.error, e, {
                              label: 'AgentClientArchivedDocumentOptionsOnDownload',
                              ...e,
                            });
                            toast(documentToastDownloadErr(errorCode));
                          } finally {
                            setIsLoading(false);
                          }
                        }}
                        onDelete={async () => {
                          await deleteDocument.mutateAsync(id);
                          await archivedDocuments.refetch();
                        }}
                      />
                    }
                  />
                );
              })}
            </List>
          </Card>
        )}
      </Box>
      <Box>
        <Card p={6} pt={10} mb={6}>
          <Heading as="h3" size="md" fontFamily="body">
            Allgemeine Informationen
          </Heading>
          <Divider my={4} />
          <Text mb={6} color="black">
            Hier haben Sie die Möglichkeit die Informationsdokumente für den Kunden frei zu schalten. Bitte wählen Sie
            dazu den Anlagetyp aus. Unterhalb Ihrer Auswahl werden Ihnen die Dokumente angezeigt, die der Kunde
            angezeigt bekommt.
          </Text>
          <CheckboxGroup
            colorScheme="brand.primary"
            size="lg"
            defaultValue={[
              !!productInfoImmposparen?.proportionalInvestment ? 'proportionalInvestment' : '',
              !!productInfoImmposparen?.oneTimeInvestment ? 'oneTimeInvestment' : '',
            ]}
          >
            <HStack>
              <Checkbox
                value="proportionalInvestment"
                onChange={() => toggleImmosparenProducts('proportionalInvestment')}
              >
                Ratierliche Anlage
              </Checkbox>
              <Checkbox value="oneTimeInvestment" onChange={() => toggleImmosparenProducts('oneTimeInvestment')}>
                Einmanlanlage
              </Checkbox>
            </HStack>
          </CheckboxGroup>
          {(productInfoImmposparen?.proportionalInvestment || productInfoImmposparen?.oneTimeInvestment) &&
            immosparenDocuments.length > 0 && <Divider mt={6} />}
          <List ml={3}>
            {(productInfoImmposparen?.proportionalInvestment || productInfoImmposparen?.oneTimeInvestment) &&
              immosparenDocuments.map((immosparenDocs, i) => {
                const { title, src, size, updatedAt } = immosparenDocs;

                return (
                  <ClientDocumentListItem
                    key={i}
                    showLabel={i === 0}
                    statusIcon={<PDFIcon />}
                    title={<span>{title}</span>}
                    category="PDF Dokument"
                    updatedAt={updatedAt.toISOString()}
                    subtitle={size}
                    shortcutActionLabel={i === 0 ? 'Sichbar für' : ''}
                    shortcutActions={() => (
                      <Grid templateColumns="max-content 1fr" gap={5} alignItems="center">
                        <Grid templateColumns="repeat(2, 40px)" justifyItems="center" alignItems="center" gap={3}>
                          <Avatar
                            size="sm"
                            name="Berater"
                            bg="brand.primary.500"
                            color="white"
                            fontSize={['sm', null, null, '14px']}
                          />
                          <Avatar
                            size="sm"
                            name="Kunde"
                            bg="brand.primary.500"
                            color="white"
                            fontSize={['sm', null, null, '14px']}
                          />
                        </Grid>
                        <NextLink href={src} passHref>
                          <Link isExternal>
                            <DownloadIcon
                              color="brand.primary.500"
                              _hover={{ color: 'brand.primary.900', cursor: 'pointer' }}
                            />
                          </Link>
                        </NextLink>
                      </Grid>
                    )}
                    actions={
                      <AgentClientArchivedDocumentOptions
                        onDownload={async () => {
                          try {
                            // Download PDf
                            if (src) {
                              void router.push(src);
                            }
                          } catch (e) {
                            const errorCode = log(LogLevel.error, e, {
                              label: 'ProductImmosparenDocumentOptionsOnDownload',
                              ...e,
                            });
                            toast(documentToastDownloadErr(errorCode));
                          }
                        }}
                      />
                    }
                  />
                );
              })}
          </List>
        </Card>
      </Box>
    </Grid>
  );
};
