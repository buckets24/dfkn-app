import React, { FC, useCallback, useEffect, useState } from 'react';
import { Badge, Box, Divider, Grid, Heading, Link, List, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { API } from 'aws-amplify';
import axios from 'axios';
import Card from 'jexity-app/card/Card';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { useRouter } from 'next/router';
import { OnlineDocumentStatus } from 'src/API';
import { ClientUpcomingMeetingCard } from 'src/components/upcoming-meeting-card/ClientUpcomingMeetingCard';
import { AgentPublicModel } from 'src/modules/agent/api/AgentModel';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { ClientDocumentListItem } from 'src/modules/documents/components/ClientDocumentListItem';
import { formatSalutation, isUnauthorizedError } from 'src/modules/common/utils';
import { PrintResponse } from 'src/modules/documents/api/generatePDF';
import { documentToastDownloadErr, documentToastRequestingDocumentErr } from 'src/modules/documents/documentMsg';
import { useArchiveDocumentsByClientIdQuery } from 'src/modules/documents/query-hooks/useArchiveDocumentsByClientIdQuery';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import useUpdateDocumentMutation from 'src/modules/documents/query-hooks/useUpdateDocumentMutation';
import downloadURI from 'src/modules/documents/utils/downloadUri';
import { AgentContactCard } from 'src/views/agents/cards/AgentContactCard';
import {
  AgentClientArchivedDocumentOptions,
  AgentClientDocumentOptions,
} from 'src/views/agents/document-options/AgentClientDocumentOptions';
import { getClientDashboardLayout } from 'src/views/client/ClientDashboardLayout';
import { gotoLogin } from 'src/views/common/routing';
import { agentToastLoadingUnknowErr } from 'src/modules/agent/agentMsg';
import DocumentCreateWatcher from 'src/modules/documents/watchers/DocumentCreateWatcher';
import DocumentUpdateWatcher from 'src/modules/documents/watchers/DocumentUpdateWatcher';
import { DownloadIcon } from 'src/theme/icons/DownloadIcon';
import { Spinner } from '@chakra-ui/spinner';
import {
  documentOptions,
  immosparenOneTimeInvestmentDocuments,
  immosparenProportionalInvestmentDocuments,
} from 'src/modules/documents/api/documentOptions';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import NextLink from 'next/link';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { DocumentIncompleteIcon } from 'src/theme/icons/DocumentIncompleteIcon';
import { LockIcon } from 'jexity-app/icons/LockIcon';
import { ArchiveIcon } from 'jexity-app/icons/ArchiveIcon';
import { PDFIcon } from 'src/theme/icons/PDFIcon';
interface DashboardProps {
  agent: AgentPublicModel;
}

const Dashboard: FC<DashboardProps> & HasLayout = () => {
  const me = useAuthStore(getMe);
  const router = useRouter();
  const toast = useToast();
  const [responsibleAgent, setResponsibleAgent] = useState<AgentPublicModel>();
  const currentClient = useClientByIdQuery(me?.id);
  const productInfoImmposparen = currentClient.data?.productInfoImmposparen;
  const immosparenDocuments = [
    ...(productInfoImmposparen?.proportionalInvestment ? immosparenProportionalInvestmentDocuments : []),
    ...(productInfoImmposparen?.oneTimeInvestment ? immosparenOneTimeInvestmentDocuments : []),
  ];

  const documents = useDocumentsByClientIdQuery(me?.id, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useDocumentsByClientIdQuery() in ClientDashboard', e);
      toast(documentToastRequestingDocumentErr(errorCode));
    },
  });

  const archivedDocuments = useArchiveDocumentsByClientIdQuery(me?.id, API, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useArchiveDocumentsByClientIdQuery() in ClientDashboard', e);
      toast(documentToastRequestingDocumentErr(errorCode));
    },
  });

  const sortedDocuments =
    documents.data?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) ?? [];
  const visibleDocument = sortedDocuments.filter((doc) => doc.isVisibleToClient);
  const sortedArchivedDocuments =
    archivedDocuments.data?.sort((a, b) => {
      if (a && b) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return 0;
      }
    }) ?? archivedDocuments.data;

  const updateDocumentMutation = useUpdateDocumentMutation(me?.id);

  const handleEditDocument = useCallback<(documentId: string) => void>(
    (documentId) => {
      void router.push(`client/documents/${documentId}`);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router]
  );

  useEffect(() => {
    const req = async () => {
      void documents.refetch();
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

  useEffect(() => {
    if (me) {
      const requestResponsibleAgent = async () => {
        const agent = await axios.get<AgentPublicModel | null>(
          `/api/clients/${me.sub}/responsible-agent?agentId=${me.owner}`
        );
        if (agent.data) {
          setResponsibleAgent(agent.data);
        }
      };
      requestResponsibleAgent().catch((e) => {
        const errorCode = log(LogLevel.error, e?.message ?? 'requestResponsibleAgent() in ClientDashboard', e);
        toast(agentToastLoadingUnknowErr(errorCode));
      });
    }
  }, [me, toast]);

  return (
    <>
      {responsibleAgent?.sub && me?.sub && <DocumentCreateWatcher editors={[responsibleAgent.sub, me.sub]} />}
      {responsibleAgent?.sub && me?.sub && <DocumentUpdateWatcher editors={[responsibleAgent.sub, me.sub]} />}
      <Card px={6} py={4} minH="152px">
        <Text mb={2} color="gray.500" fontWeight={700} fontSize="xs" textTransform="uppercase" letterSpacing={1}>
          willkommen zurück
        </Text>
        <Heading as="h3" color="gray.900" fontSize={['lg', null, 'xl', '3xl']}>
          {formatSalutation(me)}
        </Heading>
      </Card>
      <Grid templateColumns={['1fr', null, '1fr 1fr']} gap={5}>
        <ClientUpcomingMeetingCard />
        <AgentContactCard agent={responsibleAgent} />
      </Grid>
      <Box>
        {visibleDocument.length > 0 && (
          <Card p={6} mb={5}>
            <Heading as="h3" size="md" color="gray.900" fontFamily="body">
              Online Dokumente
            </Heading>
            {visibleDocument.length > 0 && <Divider mt={4} />}
            <List ml={3}>
              {visibleDocument.map(({ id, status, title, type, updatedAt, version, contractor, patches }, i) => {
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
                    shortcutActions={(isLoading, setIsLoading) => (
                      <Box pt={i === 0 ? '3.2rem' : '.4rem'} textAlign="right">
                        {(status === OnlineDocumentStatus.COMPLETE || status === OnlineDocumentStatus.LOCK) && (
                          <>
                            {isLoading ? (
                              <Spinner mt={1} size="sm" color="gray.400" />
                            ) : (
                              <DownloadIcon
                                color="brand.primary.500"
                                _hover={{ color: 'brand.primary.900', cursor: 'pointer' }}
                                onClick={async () => {
                                  try {
                                    setIsLoading?.(true);
                                    // Download PDf
                                    const response = await axios.get<PrintResponse>(
                                      `/api/documents/print?documentId=${id}`
                                    );
                                    downloadURI(response.data.dataUrl, title);
                                  } catch (e) {
                                    const errorCode = log(LogLevel.error, e, {
                                      label: 'ClientDocumentListItemOnDownload',
                                      ...e,
                                    });
                                    toast(documentToastDownloadErr(errorCode));
                                  } finally {
                                    setIsLoading?.(false);
                                  }
                                }}
                              />
                            )}
                          </>
                        )}
                      </Box>
                    )}
                    actions={
                      <AgentClientDocumentOptions
                        documentType={type}
                        documentIsLocked={status === OnlineDocumentStatus.LOCK}
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
              })}
            </List>
          </Card>
        )}

        {sortedArchivedDocuments && sortedArchivedDocuments.length > 0 && (
          <Card p={6}>
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
                    shortcutActions={(isLoading, setIsLoading) => (
                      <Box pt={i === 0 ? '3.2rem' : '.4rem'} textAlign="right">
                        {isLoading ? (
                          <Spinner mt={1} size="sm" color="gray.400" />
                        ) : (
                          <DownloadIcon
                            color="brand.primary.500"
                            _hover={{ color: 'brand.primary.900', cursor: 'pointer' }}
                            onClick={async () => {
                              try {
                                setIsLoading?.(true);
                                // Download PDf
                                const response = await axios.get<PrintResponse>(
                                  `/api/documents/print?documentId=${id}`
                                );
                                downloadURI(response.data.dataUrl, title);
                              } catch (e) {
                                const errorCode = log(LogLevel.error, e, {
                                  label: 'ClientDocumentListItemOnDownload',
                                  ...e,
                                });
                                toast(documentToastDownloadErr(errorCode));
                              } finally {
                                setIsLoading?.(false);
                              }
                            }}
                          />
                        )}
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
        {/* <Card px={6} py={4} mb={5}>
          <Heading as="h3" size="md" color="gray.900" fontFamily="body">
            Individuelle Dokumente
          </Heading>
        </Card> */}

        {(productInfoImmposparen?.oneTimeInvestment || productInfoImmposparen?.proportionalInvestment) && (
          <Card p={6} mb={5}>
            <Heading as="h3" size="md" color="gray.900" fontFamily="body">
              Allgemeine Informationen
            </Heading>
            <Divider mt={4} />
            <List ml={3}>
              {(productInfoImmposparen.proportionalInvestment || productInfoImmposparen.oneTimeInvestment) &&
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
                      shortcutActions={() => (
                        <Grid
                          templateColumns="1fr"
                          justifyItems="right"
                          alignItems="center"
                          pt={i === 0 ? '3.3rem' : '.5rem'}
                        >
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
                                label: 'AgentClientArchivedDocumentOptionsOnDownload',
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
        )}
      </Box>
    </>
  );
};

Dashboard.getLayout = getClientDashboardLayout;

export default Dashboard;
