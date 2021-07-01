import API from '@aws-amplify/api-graphql';
import { Box, CircularProgress, Fade, Tooltip } from '@chakra-ui/react';
import { SuccessIcon } from 'jexity-app/icons/SuccessIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { FC, useEffect, useState } from 'react';
import {
  OnCreateDocumentPatchByDocumentIdSubscription,
  OnCreateDocumentPatchByDocumentIdSubscriptionVariables,
} from 'src/API';
import { onCreateDocumentPatchByDocumentId } from 'src/graphql/subscriptions';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { PayloadType } from 'src/utils/type-utils/ResultType';
import Observable from 'zen-observable-ts';
import DocumentModel from '../api/DocumentModel';
import useDocumentPatchesByDocumentIdQuery from '../query-hooks/useDocumentPatchesByDocumentIdQuery';

const DocumentPatchCreateWatcher: FC<{ documentId: DocumentModel['id'] }> = ({ documentId }) => {
  const activeDocumentPatches = useDocumentPatchesByDocumentIdQuery(documentId, { enabled: false });
  const me = useAuthStore(getMe);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let unsubscribe;
    setShow(true);

    if (me?.sub) {
      const variables: OnCreateDocumentPatchByDocumentIdSubscriptionVariables = {
        documentId,
      };
      const observable = API.graphql({
        query: onCreateDocumentPatchByDocumentId,
        variables,
      });

      if (observable instanceof Observable) {
        const subscription = (observable as Observable<
          PayloadType<OnCreateDocumentPatchByDocumentIdSubscription>
        >).subscribe({
          next: async (payload) => {
            try {
              const result = payload.value.data?.onCreateDocumentPatchByDocumentId;

              if (result) {
                void activeDocumentPatches.refetch();
              }
            } catch (e) {
              log(LogLevel.error, e, { label: 'DocumentPatcheCreateWatcher', ...e });
            }
          },
        });
        unsubscribe = () => subscription.unsubscribe();
      }
    }

    setTimeout(() => {
      setShow(false);
    }, 3000);
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.sub, documentId, activeDocumentPatches.data]);

  return (
    <Box position="absolute" left={3} bottom={2} zIndex={1}>
      <Fade in={show} unmountOnExit>
        <Tooltip label="Synchronisierung..." aria-label="In-progress" bg="brand.primary.500" placement="right-end">
          <Box as="span">
            <CircularProgress mt={-1} isIndeterminate size="24px" color="brand.primary.500" />
          </Box>
        </Tooltip>
      </Fade>
      <Fade in={!show} unmountOnExit>
        <Tooltip label="Synchronisiert" aria-label="Up to date" bg="green.400" placement="right-end">
          <Box as="span">
            <SuccessIcon mt={-1} w="30px" h="30px" />
          </Box>
        </Tooltip>
      </Fade>
    </Box>
  );
};

export default DocumentPatchCreateWatcher;
