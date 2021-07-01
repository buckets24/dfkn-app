import { Box, useToast } from '@chakra-ui/react';
import { API } from 'aws-amplify';
import FormActionsContainer from 'jexity-app/layout/FormActionsContainer';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import { ClientDocuments } from 'src/modules/documents/components/ClientDocuments';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { documentToastRequestingDocumentErr } from 'src/modules/documents/documentMsg';
import { useArchiveDocumentsByClientIdQuery } from 'src/modules/documents/query-hooks/useArchiveDocumentsByClientIdQuery';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import { getAgentClientLayout } from 'src/views/agents/client-management/AgentClientLayout';
import { gotoAgentClients, gotoLogin } from 'src/views/common/routing';

const ClientEditDocuments: FC & HasLayout = () => {
  const router = useRouter();
  const clientId = router.query.id;
  const toast = useToast();
  if (typeof clientId !== 'string') {
    throw new Error(`Can't render ClientDocuments since clientId is not a string`);
  }

  useClientByIdQuery(clientId, {
    refetchOnWindowFocus: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        if (clientId) {
          gotoAgentClients(router);
        } else {
          gotoLogin(router);
        }
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useClientByIdQuery() in ClientEditDocuments', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });

  useDocumentsByClientIdQuery(clientId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        if (clientId) {
          gotoAgentClients(router);
        } else {
          gotoLogin(router);
        }
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useDocumentsByClientIdQuery() in ClientEditDocuments', e);
      toast(documentToastRequestingDocumentErr(errorCode));
    },
  });

  useArchiveDocumentsByClientIdQuery(clientId, API, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        if (clientId) {
          gotoAgentClients(router);
        } else {
          gotoLogin(router);
        }
      }
      const errorCode = log(
        LogLevel.error,
        e?.message ?? 'useArchiveDocumentsByClientIdQuery() in ClientEditDocuments',
        e
      );
      toast(documentToastRequestingDocumentErr(errorCode));
    },
  });

  return (
    <Box pos="relative" p={6}>
      {/* Just a spacer of uniform spacing */}
      <FormActionsContainer>
        <Box pb="1px" w="100%" minH={['97px', null, null, '50px']} />
      </FormActionsContainer>
      <ClientDocuments />
    </Box>
  );
};

ClientEditDocuments.getLayout = getAgentClientLayout;

export default ClientEditDocuments;
