import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Divider,
  Fade,
  Flex,
  Grid,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverProps,
  PopoverTrigger,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { ChevronIcon } from 'jexity-app/icons/ChevronIcon';
import { LockIcon } from 'jexity-app/icons/LockIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import React, { FC, ReactNode, useEffect, useState } from 'react';
import { ContractorType, OnlineDocumentStatus, OnlineDocumentType } from 'src/API';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import DocumentModel from 'src/modules/documents/api/DocumentModel';
import { groupDocumentsByProduct } from 'src/modules/documents/api/productGroupType';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import { DocumentIcon } from 'src/theme/icons/DocumentIcon';
import { DocumentIncompleteIcon } from 'src/theme/icons/DocumentIncompleteIcon';
import { FolderMinusIcon } from 'src/theme/icons/FolderMinusIcon';
import { FolderPlusIcon } from 'src/theme/icons/FolderPlusIcon';
import {
  DocumentOption,
  documentOptions,
  hasContractorSelection,
} from '../../../modules/documents/api/documentOptions';

export interface DocumentSelectProps {
  label?: string;
  onSelectType: (option: DocumentOption, contractor: ContractorType) => void;
  placement?: PopoverProps['placement'];
  options?: DocumentOption[];
  customPopupTrigger?: ReactNode;
  closeOnSelect?: boolean;
  documents?: DocumentModel[];
  showDocumentStatus?: boolean;
}

export const DocumentSelect: FC<DocumentSelectProps> = ({
  label = 'Dokumente',
  onSelectType,
  placement = 'bottom',
  options = documentOptions,
  customPopupTrigger,
  closeOnSelect = false,
  documents = [],
  showDocumentStatus = true,
}) => {
  const router = useRouter();
  const id = router.query.id;
  const toast = useToast();
  const [activeDocumentType, setActiveDocumentType] = useState<OnlineDocumentType | null>();
  const { onOpen, onClose, isOpen, onToggle } = useDisclosure();
  const [isSelectContractorOpen, setIsSelectContractorOpen] = useState(false);
  const [hasContractor, setHasContractor] = useState(false);

  const { data } = useMeetingByIdQuery(typeof id === 'string' ? id : undefined, {
    enabled: false,
  });

  const activeMeeting = data;
  const clientId = activeMeeting?.clientId ?? router.query.id;
  const groupedOptions = groupDocumentsByProduct(options);
  const activeProps = {
    color: 'brand.primary.500',
  };

  const client = useClientByIdQuery(typeof clientId === 'string' ? clientId : undefined, {
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e.message ?? 'fetchClientById() in DocumentSelect', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
    enabled: isOpen,
  });

  useEffect(() => {
    /**
     * Check if the client has contractor info to display the '2. Vertragspartner'
     * item on the document select upon creating a document.
     */
    if (isOpen) {
      const checkClientContractor = async () => {
        if (client.data?.contractor) {
          /**
           * Check if the contract info is not empty
           */
          if (!!Object.values(client.data.contractor).find((data) => data && data)) {
            setHasContractor(true);
          } else {
            setHasContractor(false);
          }
        }
      };
      checkClientContractor().catch((e) => {
        log(LogLevel.error, e, { label: 'DocumentSelect', ...e });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsSelectContractorOpen(false);
    }
  }, [isOpen]);

  return (
    <Popover placement={placement} isOpen={isOpen} onOpen={onOpen} onClose={onClose} closeOnBlur>
      <PopoverTrigger>
        {customPopupTrigger ? (
          customPopupTrigger
        ) : (
          <Box cursor="pointer" fontSize="md" whiteSpace="nowrap" userSelect="none" onClick={onToggle}>
            {label} <ChevronIcon ml={3} direction={!isOpen ? 'top' : 'bottom'} />
          </Box>
        )}
      </PopoverTrigger>
      <PopoverContent
        px={2}
        pt={2}
        maxW="360px"
        border="none"
        borderRadius={0}
        boxShadow="0px 12px 32px rgba(26, 26, 26, 0.5)"
      >
        <PopoverHeader border="none" fontSize="lg" fontWeight={500} fontFamily="heading">
          Dokumente ({options.length})
        </PopoverHeader>
        <Divider borderColor="black" opacity={0.12} />
        <Accordion px={4} py={4} maxH={['500px']} overflowY="scroll" allowToggle>
          {groupedOptions.map((group, i) => {
            return (
              <AccordionItem key={i} border="none">
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      px={0}
                      role="group"
                      color="gray.500"
                      _hover={{ background: 'transparent', color: 'brand.primary.500' }}
                    >
                      {isExpanded ? <FolderMinusIcon mr={2} mb={1} /> : <FolderPlusIcon mr={2} mb={1} />}
                      <Text
                        fontWeight="bold"
                        _groupHover={{
                          transition: 'color  0.2s ease-in-out',
                          color: 'brand.primary.500',
                        }}
                      >{`${group.name} (${group.documents.length})`}</Text>
                    </AccordionButton>
                    {group.documents.map((document, i) => {
                      const isActive = document.type === activeDocumentType;
                      const documentsToBeMatched = documents.length > 0 ? documents : documents;
                      const matchingDocument = documentsToBeMatched.find((doc) => document.type === doc.type);

                      if (document.isActive || matchingDocument) {
                        return (
                          <AccordionPanel key={i}>
                            <ListItem d="flex" justifyContent="space-between">
                              <Flex
                                alignItems="center"
                                maxW="280px"
                                cursor="pointer"
                                onClick={() => {
                                  setActiveDocumentType(document.type);
                                  if (!hasContractorSelection(document.type) || matchingDocument?.status) {
                                    onSelectType(document, ContractorType.PRIMARY);
                                    if (closeOnSelect) {
                                      onClose();
                                    }
                                  } else {
                                    setIsSelectContractorOpen(true);
                                  }
                                }}
                              >
                                <Grid templateColumns="max-content 1fr">
                                  <DocumentIcon mr={3} />
                                  <Box>
                                    <Text
                                      color="gray.900"
                                      {...(isActive && showDocumentStatus && activeProps)}
                                      _hover={activeProps}
                                    >
                                      {document.title}{' '}
                                      {matchingDocument?.version && (
                                        <Badge colorScheme="blue">{`v.${matchingDocument.version}`}</Badge>
                                      )}
                                    </Text>
                                    {matchingDocument?.status && (
                                      <Text mt={2} color="gray.400" fontSize="sm">
                                        {matchingDocument.contractor === 'SECONDARY' ? '2. ' : '1. '}Vertragspartner
                                      </Text>
                                    )}
                                  </Box>
                                </Grid>
                              </Flex>
                              {matchingDocument?.status === OnlineDocumentStatus.COMPLETE && (
                                <CheckIcon mt={1} color="support.success.500" />
                              )}
                              {matchingDocument?.status === OnlineDocumentStatus.INCOMPLETE && (
                                <DocumentIncompleteIcon mt={1} color="brand.primary.500" />
                              )}
                              {matchingDocument?.status === OnlineDocumentStatus.LOCK && (
                                <LockIcon mt={1} color="brand.tertiary.500" />
                              )}
                            </ListItem>
                            {isSelectContractorOpen &&
                              hasContractorSelection(document.type) &&
                              document.type === activeDocumentType &&
                              !matchingDocument?.status && (
                                <Fade in={document.type === activeDocumentType}>
                                  <Box px={8} pb={1}>
                                    <Text mt={3} color="gray.400">
                                      Zuweisen an
                                    </Text>
                                    <List pt={4}>
                                      <ListItem mb={5} cursor="pointer">
                                        <Text
                                          color="gray.900"
                                          _hover={activeProps}
                                          onClick={() => {
                                            onSelectType(document, ContractorType.PRIMARY);
                                            setActiveDocumentType(document.type);
                                            if (closeOnSelect) {
                                              onClose();
                                            }
                                          }}
                                        >
                                          1. Vertragspartner
                                        </Text>
                                      </ListItem>
                                      {hasContractor && (
                                        <ListItem mb={5} cursor="pointer">
                                          <Text
                                            color="gray.900"
                                            _hover={activeProps}
                                            onClick={() => {
                                              onSelectType(document, ContractorType.SECONDARY);
                                              setActiveDocumentType(document.type);
                                              if (closeOnSelect) {
                                                onClose();
                                              }
                                            }}
                                          >
                                            2. Vertragspartner
                                          </Text>
                                        </ListItem>
                                      )}
                                    </List>
                                  </Box>
                                </Fade>
                              )}
                          </AccordionPanel>
                        );
                      }
                    })}
                  </>
                )}
              </AccordionItem>
            );
          })}
        </Accordion>
      </PopoverContent>
    </Popover>
  );
};
