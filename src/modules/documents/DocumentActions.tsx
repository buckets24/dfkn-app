import { Box, Button, ButtonGroup, IconButton, SimpleGrid, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { API } from 'aws-amplify';
import axios from 'axios';
import { LockIcon } from 'jexity-app/icons/LockIcon';
import { PrintPreviewIcon } from 'jexity-app/icons/PrintPreviewIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import React, { FC, memo, useEffect, useState } from 'react';
import { OnlineDocumentStatus } from 'src/API';
import { DocumentMenuIcon } from 'src/theme/icons/DocumentMenuIcon';
import { LikeIcon } from 'src/theme/icons/LikeIcon';
import { AgentClientDocumentOptions } from 'src/views/agents/document-options/AgentClientDocumentOptions';
import { getMe, isAgent, useAuthStore } from '../auth/authStore';
import { PrintResponse } from './api/generatePDF';
import { DocumentLockModal } from './DocumentLockModal';
import {
  documentNewVersionToastCreateErr,
  documentToastDownloadErr,
  documentToastRequestingDocumentErr,
} from './documentMsg';
import { DocumentPrintModel } from './DocumentPrintModal';
import { useArchiveDocumentsByClientIdQuery } from './query-hooks/useArchiveDocumentsByClientIdQuery';
import useDocumentByIdQuery from './query-hooks/useDocumentByIdQuery';
import useDocumentsByClientIdQuery from './query-hooks/useDocumentsByClientIdQuery';
import useNewDocumentVersionMutation from './query-hooks/useNewDocumentVersionMutation';
import useUpdateDocumentMutation from './query-hooks/useUpdateDocumentMutation';
import downloadURI from './utils/downloadUri';

export interface DocumentActionsProps {
  documentId: string;
}

export const DocumentActions: FC<DocumentActionsProps> = memo(({ documentId }) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const lockDisclosure = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<PrintResponse['base64']>();
  const document = useDocumentByIdQuery(documentId);
  const documents = useDocumentsByClientIdQuery(document.data?.clientId);
  const filename = `dfk-${document.data?.type.replace('_', '-').toLowerCase()}-${new Date().toISOString()}.pdf`;
  const toast = useToast();
  const me = useAuthStore(getMe);
  const newDocumentVersionMutation = useNewDocumentVersionMutation(me?.id);
  const archivedDocuments = useArchiveDocumentsByClientIdQuery(document.data?.clientId, API, {
    enabled: false,
  });

  useEffect(() => {
    const downloadFile = async () => {
      try {
        setLoading(true);
        const res = await axios.get<PrintResponse>(`/api/documents/print?documentId=${documentId}`);
        setFile(res.data.dataUrl);

        setLoading(false);
      } catch (e) {
        log(LogLevel.error, e, { label: 'DocumentPrintPreview', ...e });
      }
    };

    if (isOpen && documentId) {
      downloadFile().catch((e) => {
        const errorCode = log(LogLevel.error, e, { label: 'DownloadDocument', ...e });
        toast(documentToastDownloadErr(errorCode));
      });
    }
  }, [isOpen, documentId, toast]);

  return (
    <Box h="100%">
      <SimpleGrid
        pos="absolute"
        right="16px"
        bottom="16px"
        gridTemplateColumns="min-content min-content"
        columnGap="16px"
      >
        {documentId && (
          <>
            {me && isAgent(me) ? (
              <>
                {document.data && (
                  <ButtonGroup
                    isAttached
                    colorScheme="brand.tertiary"
                    boxShadow="0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
                    borderBottomLeftRadius="0.375rem"
                    borderBottomRightRadius="0.375rem"
                  >
                    <Button
                      fontWeight="normal"
                      fontSize="sm"
                      zIndex={1}
                      bg="brand.tertiary.500"
                      color="white"
                      _hover={{ bg: 'brand.tertiary.900' }}
                      borderTopRightRadius={0}
                      borderBottomRightRadius={0}
                      onClick={lockDisclosure.onOpen}
                      disabled={document.data.status === OnlineDocumentStatus.LOCK}
                      _disabled={{
                        opacity: 1,
                        bg: 'brand.tertiary.300',
                        color: 'gray.500',
                      }}
                    >
                      <LockIcon mr={2} />
                      Dokument abschließen
                    </Button>
                    <Box
                      bg="brand.tertiary.500"
                      borderTopRightRadius="0.375rem"
                      borderBottomRightRadius="0.375rem"
                      transition="background 200ms ease-in"
                      _hover={{
                        bg: 'brand.tertiary.900',
                      }}
                    >
                      <AgentClientDocumentOptions
                        iconColor="white"
                        documentType={document.data.type}
                        documentIsLocked={true}
                        {...(document.data.status === OnlineDocumentStatus.LOCK && {
                          onNewVersion: async (contractorType, setIsLoading) => {
                            try {
                              setIsLoading(true);
                              if (document.data?.id) {
                                await newDocumentVersionMutation.mutateAsync({
                                  documentId: document.data.id,
                                  contractorType: contractorType,
                                });
                                await document.refetch();
                                await archivedDocuments.refetch();
                              }
                            } catch (e) {
                              const errorCode = log(LogLevel.error, e, {
                                label: 'AgentClientDocumentOptionsOnNewVersion',
                                ...e,
                              });
                              toast(documentNewVersionToastCreateErr(errorCode));
                            } finally {
                              setIsLoading(false);
                            }
                          },
                        })}
                        onDownload={async (setIsLoading) => {
                          try {
                            if (document.data?.id && document.data.title) {
                              setIsLoading(true);
                              // Download PDf
                              const response = await axios.get<PrintResponse>(
                                `/api/documents/print?documentId=${document.data.id}`
                              );
                              downloadURI(response.data.dataUrl, document.data.title);
                            }
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
                    </Box>
                  </ButtonGroup>
                )}
              </>
            ) : (
              <Button
                zIndex={1}
                bg="support.success.500"
                color="white"
                fontWeight="normal"
                fontSize="sm"
                boxShadow="0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
                _hover={{ bg: 'support.success.600' }}
                onClick={lockDisclosure.onOpen}
                disabled={document.data?.status === OnlineDocumentStatus.LOCK}
              >
                <LikeIcon mr={2} color="white" />
                Dokument fertigstellen
              </Button>
            )}
            <DocumentLockModal
              {...lockDisclosure}
              documentId={documentId}
              onLockFinish={() => {
                (async () => {
                  if (documentId) {
                    void document.refetch();
                    void documents.refetch();
                  }
                })().catch((e) => {
                  const errorCode = log(LogLevel.error, e, { label: 'VideoConferenceRequestDocument', ...e });
                  toast(documentToastRequestingDocumentErr(errorCode));
                });
              }}
            />
          </>
        )}
        <Tooltip label="Druckvorschau" aria-label="Druckvorschau" bg="brand.primary.500" placement="top">
          <Button
            variant="solid"
            onClick={onOpen}
            zIndex={1}
            boxShadow="0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)"
            bg="brand.primary.500"
            color="white"
            _hover={{ bg: 'brand.primary.900' }}
            p="0"
          >
            <PrintPreviewIcon />
          </Button>
        </Tooltip>
      </SimpleGrid>
      {/* Make sure this component is rendered within a height=100% div */}
      <DocumentPrintModel
        documentId={documentId}
        file={file}
        filename={filename}
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
      />
    </Box>
  );
});
