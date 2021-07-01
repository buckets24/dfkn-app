import {
  Box,
  Button,
  Fade,
  IconProps,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { WithModal } from 'jexity-app/modal/WithModal';
import { log, LogLevel } from 'jexity-app/utils/logger';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ContractorType, OnlineDocumentType } from 'src/API';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { DocumentMenuIcon } from 'src/theme/icons/DocumentMenuIcon';

interface AgentClientDocumentOptionsProps {
  documentType: OnlineDocumentType;
  onClickEditDocument?: (props?: any | undefined) => void;
  onNewVersion?: (type: ContractorType, setIsLoading: Dispatch<SetStateAction<boolean>>) => Promise<void>;
  onLockDocument?: () => Promise<void>;
  onDownload?: (setIsLoading: Dispatch<SetStateAction<boolean>>) => void;
  documentIsLocked: boolean;
  iconColor?: IconProps['color'];
}

type LoaderType = 'DOWNLOAD' | 'LOCK' | 'NEW_VERSION' | null;

export const AgentClientDocumentOptions: FC<AgentClientDocumentOptionsProps> = ({
  documentType,
  onClickEditDocument,
  onNewVersion,
  onLockDocument,
  onDownload,
  documentIsLocked = false,
  iconColor = 'gray.400',
}) => {
  const router = useRouter();
  const clientId = routerQueryGetAsString(router.query.id);
  const [isSelectContractorOpen, setIsSelectContractorOpen] = useState(false);
  const [hasContractor, setHasContractor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loaderType, setLoaderType] = useState<LoaderType>(null);
  const client = useClientByIdQuery(clientId, {
    enabled: false,
  });

  useEffect(() => {
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
      log(LogLevel.error, e, { label: 'AgentClientDocumentOptions', ...e });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const MenuItemLoader: FC<{ type: LoaderType }> = ({ type }) => {
    return (
      <Fade in={isLoading && type === loaderType} unmountOnExit>
        <Spinner size="sm" mt={2} ml={2} color="brand.primary.500" />
      </Fade>
    );
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} bg="transparent">
        <DocumentMenuIcon color={iconColor} />
      </MenuButton>
      <MenuList>
        {onClickEditDocument && (
          <MenuItem onClick={onClickEditDocument}>{documentIsLocked ? 'Dokument anzeigen' : 'Bearbeiten'}</MenuItem>
        )}
        {documentIsLocked && onNewVersion && (
          <MenuItem
            onClick={() => {
              if (documentType === OnlineDocumentType.INVESTMENT_KOMPASS) {
                setLoaderType('NEW_VERSION');
                void onNewVersion(ContractorType.PRIMARY, setIsLoading);
              } else {
                setIsSelectContractorOpen(true);
              }
            }}
          >
            Neue Version erstellen <MenuItemLoader type="NEW_VERSION" />
          </MenuItem>
        )}
        {documentIsLocked && onNewVersion && isSelectContractorOpen && (
          <Fade in={isSelectContractorOpen}>
            <Box px={8} pb={1}>
              <Text mt={3} color="gray.400">
                Zuweisen an
              </Text>
              <List pt={4}>
                <ListItem mb={5} cursor="pointer">
                  <Text
                    color="gray.900"
                    _hover={{ color: 'brand.primary.500' }}
                    onClick={() => {
                      setLoaderType('NEW_VERSION');
                      void onNewVersion(ContractorType.PRIMARY, setIsLoading);
                    }}
                  >
                    1. Vertragspartner
                  </Text>
                </ListItem>
                {hasContractor && (
                  <ListItem mb={5} cursor="pointer">
                    <Text
                      color="gray.900"
                      _hover={{ color: 'brand.primary.500' }}
                      onClick={() => {
                        setLoaderType('NEW_VERSION');
                        void onNewVersion(ContractorType.SECONDARY, setIsLoading);
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
        {documentIsLocked && onDownload && (
          <MenuItem
            onClick={() => {
              setLoaderType('DOWNLOAD');
              onDownload(setIsLoading);
            }}
          >
            Dokument herunterladen <MenuItemLoader type="DOWNLOAD" />
          </MenuItem>
        )}
        {!documentIsLocked && onLockDocument && (
          <WithModal
            modalHeader="Dokument abschliessen?"
            modalBody="Sind Sie sicher, dass Sie dieses Dokument abschliessen möchten? Es wird gesperrt und eine Version im Archiv erstellet."
            scheme="PRIMARY_BRAND"
            confirmText="Dokument abschliessen"
            onConfirm={async () => {
              await onLockDocument();
            }}
          >
            <MenuItem>Dokument abschließen</MenuItem>
          </WithModal>
        )}
      </MenuList>
    </Menu>
  );
};

interface AgentClientArchivedDocumentOptionsProps {
  onDownload: (setIsLoading: Dispatch<SetStateAction<boolean>>) => void;
  onDelete?: () => Promise<void>;
  iconColor?: IconProps['color'];
}

export const AgentClientArchivedDocumentOptions: FC<AgentClientArchivedDocumentOptionsProps> = ({
  onDownload,
  onDelete,
  iconColor = 'gray.400',
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={Button} bg="transparent">
        <DocumentMenuIcon color={iconColor} />
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            onDownload(setIsDownloading);
          }}
        >
          Dokument herunterladen{' '}
          <Fade in={isDownloading} unmountOnExit>
            <Spinner size="sm" mt={2} ml={2} color="brand.primary.500" />
          </Fade>
        </MenuItem>
        {onDelete && (
          <WithModal
            modalHeader="Archiviertes Dokument löschen"
            modalBody="Sind Sie sicher, dass dieses archivierte Dokument gelöscht werden soll? Diese Aktion kann nicht rückgängig gemacht werden."
            scheme="DELETE"
            confirmText="Dokument löschen"
            onConfirm={async () => {
              await onDelete();
            }}
          >
            <MenuItem>Dokument löschen</MenuItem>
          </WithModal>
        )}
      </MenuList>
    </Menu>
  );
};
