import { Box, Flex, Grid } from '@chakra-ui/react';
import { FullScreenProvider } from 'jexity-app/context/Fullscreen';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import { useRouter } from 'next/router';
import React, { FC, memo, useState } from 'react';
import 'src/AmplifyConfig';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import useDocumentPatchesByDocumentIdQuery from 'src/modules/documents/query-hooks/useDocumentPatchesByDocumentIdQuery';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import { NessyCloudLogo } from 'src/theme/icons/NessyCloudLogo';
import { NessyCloudWhiteLogo } from 'src/theme/icons/NessyCloudWhiteLogo';
import { AgentClientControls } from 'src/views/agents/controls/AgentClientControls';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { gotoAgentClients, gotoAgentSpecificClientDocuments } from 'src/views/common/routing';
import { DocumentRenderer } from 'src/views/video-conference/DocumentRenderer';

/**
 * Memoized component
 */
const AgentClientEditSingleDocument: FC = memo(() => {
  const router = useRouter();
  const activeDocumentId = routerQueryGetAsString(router.query.documentId);
  const clientId = router.query.id;
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  if (clientId && typeof clientId !== 'string') {
    throw new Error(`Can't render AgentClientEditSingleDocument since clientId is not a string`);
  }

  useDocumentByIdQuery(activeDocumentId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        if (clientId) {
          gotoAgentSpecificClientDocuments(router, clientId);
        } else {
          gotoAgentClients(router);
        }
      }
    },
  });
  useDocumentPatchesByDocumentIdQuery(activeDocumentId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        if (clientId) {
          gotoAgentSpecificClientDocuments(router, clientId);
        } else {
          gotoAgentClients(router);
        }
      }
    },
  });
  useClientByIdQuery(clientId, {
    refetchOnWindowFocus: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        if (clientId) {
          gotoAgentSpecificClientDocuments(router, clientId);
        } else {
          gotoAgentClients(router);
        }
      }
    },
  });
  useDocumentsByClientIdQuery(clientId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        if (clientId) {
          gotoAgentSpecificClientDocuments(router, clientId);
        } else {
          gotoAgentClients(router);
        }
      }
    },
  });

  return (
    <AuthGuard>
      <FullScreenProvider
        value={{
          fullscreen,
          setFullscreen,
        }}
      >
        <Box
          pos="relative"
          h={['calc(100vh - 60px)', null, null, null, 'calc(100vh - 90px)']}
          bg="brand.gradientBackground"
          overflow="hidden"
        >
          <Box px={[3, null, null, 10]}>
            <Flex
              cursor="pointer"
              onClick={() => router.push(`/agent/clients/${clientId}/documents`)}
              m="1rem 1rem 1rem 0"
            >
              {fullscreen ? (
                <NessyCloudLogo pos="relative" zIndex={1} d={['none', null, null, 'block']} />
              ) : (
                <NessyCloudWhiteLogo pos="relative" zIndex={1} />
              )}
            </Flex>
            <Grid
              my={2}
              mx="auto"
              justifyContent="center"
              minH={['calc(100vh - 160px)', null, null, null, 'calc(100vh - 200px)']}
            >
              <Box
                pos="relative"
                minW={['500px', '690px', '728px', '900px', '1105px']}
                bg="white"
                borderWidth="2px"
                borderColor="white"
                {...(fullscreen
                  ? {
                      pos: 'absolute',
                      top: 0,
                      left: 0,
                      w: '100%',
                      h: '100%',
                      borderRadius: 0,
                    }
                  : {
                      borderWidth: '2px',
                      borderColor: 'white',
                      borderRadius: '6px',
                    })}
              >
                {activeDocumentId && <DocumentRenderer activeDocumentId={activeDocumentId} allowedToScroll />}
              </Box>
            </Grid>
          </Box>
          {/* Hoverable div to display/hide video controls */}
          <Box pos="fixed" w="100%" zIndex={3} bottom={0} minH={['60px', null, null, '90px']}>
            <Box
              zIndex={3}
              pos="fixed"
              w="100%"
              bottom={0}
              transition="all 500ms"
              transitionTimingFunction="ease-in-out"
            >
              <AgentClientControls />
            </Box>
          </Box>
          {/* Removing permission modal for now */}
          {/* <PermissionDeniedModal /> */}
        </Box>
      </FullScreenProvider>
    </AuthGuard>
  );
});

export default AgentClientEditSingleDocument;
