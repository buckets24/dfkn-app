import { Box, ButtonProps, Flex, Grid, IconButton, Text } from '@chakra-ui/react';
import { useFullscreenContext } from 'jexity-app/context/Fullscreen';
import { ExitFullscreenIcon } from 'jexity-app/icons/ExitFullscreenIcon';
import { FullscreenIcon } from 'jexity-app/icons/FullscreenIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import React, { FC, memo, useEffect, useState } from 'react';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { DocumentOption, documentOptions } from 'src/modules/documents/api/documentOptions';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import DocumentCreateWatcher from 'src/modules/documents/watchers/DocumentCreateWatcher';
import { DashboardIcon } from 'src/theme/icons/DashboardIcon';
import { DocumentSelect } from 'src/views/video-conference/Controls/DocumentSelect';
import { getMe, isClient, useAuthStore } from '../../../modules/auth/authStore';

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

export const ClientControls: FC = memo(() => {
  const me = useAuthStore(getMe);
  const { fullscreen, setFullscreen } = useFullscreenContext();
  const router = useRouter();
  const documents = useDocumentsByClientIdQuery(me?.id, { enabled: false });
  const [clientDocumentOptions, setClientDocumentOptions] = useState<DocumentOption[]>([]);

  const clientResponse = useClientByIdQuery(me?.id, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const optionsArr: DocumentOption[] = [];

    if (documents.data) {
      documentOptions.forEach((option) => {
        documents.data?.forEach((doc) => {
          if (doc.type === option.type) {
            optionsArr.push(option);
          }
        });
      });

      setClientDocumentOptions(optionsArr);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documents.data]);

  return (
    <Grid
      templateColumns={['repeat(2, 1fr)']}
      alignItems="center"
      px={[5, null, null, 10]}
      h={['60px', null, null, null, '90px']}
      bg="gray.100"
    >
      <Box w="0">
        <DocumentSelect
          documents={documents.data}
          closeOnSelect
          placement="top-start"
          options={clientDocumentOptions}
          onSelectType={async (document) => {
            try {
              if (!!me?.id && isClient(me)) {
                const existingDocument = documents.data?.find(
                  (doc) => doc.type === document.type && me.id === doc.clientId
                );

                if (existingDocument) {
                  await router.push(`/client/documents/${existingDocument.id}`);
                }
              }
            } catch (e) {
              log(LogLevel.error, e.message ?? 'redirect in ClientControls', e);
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
            onClick={() => router.push(`/client/`)}
          >
            <DashboardIcon width={['16px', null, null, null, '24px']} height="auto" color="inherit" />
          </IconButton>
        </Flex>
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
