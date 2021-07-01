import { Box, Heading, Link, useToast } from '@chakra-ui/react';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import TabbedNavigation from 'jexity-app/tabbed-navigation/TabbedNavigation';
import { log, LogLevel } from 'jexity-app/utils/logger';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { formatSalutation, isUnauthorizedError } from 'src/modules/common/utils';
import { ArrowIcon } from 'src/theme/icons/ArrowIcon';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { gotoAgentClients } from 'src/views/common/routing';
import { getAgentLayout } from '../AgentLayout';

const AgentClientLayout: FC = ({ children }) => {
  const router = useRouter();
  const id = routerQueryGetAsString(router.query.id);
  const toast = useToast();
  const { status, isLoading, data, error } = useClientByIdQuery(id, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoAgentClients(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useClientByIdQuery() in ClientEditBasicInfo', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });

  let client;

  if (data) {
    const { onlineDocuments, agentDocuments, meetings, __typename, ...props } = data;
    client = props;
  }
  return (
    <AuthGuard>
      <DashboardHeading
        pt={6}
        px={6}
        minH="150px"
        headerTopContent={
          <NextLink passHref href="/agent/clients">
            <Link
              d="inline-flex"
              alignItems="center"
              fontFamily="heading"
              _hover={{ textDecor: 'none', color: 'brand.primary.500' }}
            >
              <ArrowIcon direction="left" mr={2} />
              Zurück zur Kundenverwaltung
            </Link>
          </NextLink>
        }
      >
        <Box pb={2}>
          {client && (
            <Heading as="h2" mb={2} textTransform="capitalize" whiteSpace={['initial', null, null, 'nowrap']}>
              {formatSalutation(client)}
            </Heading>
          )}
        </Box>
        <Box id="form-actions-container" w="100%" />
        {client && (
          <TabbedNavigation
            links={[
              { label: '1. Vertragspartner', href: '/agent/clients/[id]', as: `/agent/clients/${id}` },
              {
                label: '2. Vertragspartner',
                href: '/agent/clients/[id]/contractor',
                as: `/agent/clients/${id}/contractor`,
              },
              {
                label: 'Dokumente',
                href: '/agent/clients/[id]/documents',
                as: `/agent/clients/${id}/documents`,
              },
              {
                label: 'Aktivitäten',
                href: '/agent/clients/[id]/activities',
                as: `/agent/clients/${id}/activities`,
              },
            ]}
          />
        )}
      </DashboardHeading>
      {status === 'success' && children}
    </AuthGuard>
  );
};

export const getAgentClientLayout: GetLayout = (page) => getAgentLayout(<AgentClientLayout>{page}</AgentClientLayout>);

export default AgentClientLayout;
