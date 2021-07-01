import { Box, Heading, Link, useToast } from '@chakra-ui/react';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { agentToastLoadingUnknowErr } from 'src/modules/agent/agentMsg';
import useAgentByIdQuery from 'src/modules/agent/query-hooks/useAgentByIdQuery';
import { ArrowIcon } from 'src/theme/icons/ArrowIcon';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { getAdminLayout } from '../AdminLayout';

const AdminUserLayout: FC = ({ children }) => {
  const { query } = useRouter();
  const id = routerQueryGetAsString(query.id);
  const toast = useToast();
  const { status, isLoading, data, error } = useAgentByIdQuery(id, {
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e?.message ?? 'fetchAgentById() in AdminUserLayout', e);
      toast(agentToastLoadingUnknowErr(errorCode));
    },
  });

  let agent;

  if (data) {
    const { __typename, ...props } = data;
    agent = props;
  }

  return (
    <AuthGuard>
      <DashboardHeading
        pt={6}
        px={6}
        headerTopContent={
          <NextLink passHref href="/admin">
            <Link d="inline-flex" alignItems="center" _hover={{ textDecor: 'none', color: 'brand.primary.500' }}>
              <ArrowIcon direction="left" mr={2} />
              Zurück zur Beraterübersicht
            </Link>
          </NextLink>
        }
      >
        <Box pb={2}>
          {agent ? (
            <Heading as="h2" mb={2} textTransform="capitalize" whiteSpace="nowrap">
              {`${agent.firstName} ${agent.lastName}`}
            </Heading>
          ) : (
            <Heading as="h2" fontSize={['xl', null, null, '4xl']} whiteSpace="nowrap">
              Beraterverwaltung
            </Heading>
          )}
        </Box>
        <Box id="form-actions-container" />
      </DashboardHeading>
      {status === 'success' && children}
    </AuthGuard>
  );
};

export const getAdminUserLayout: GetLayout = (page) => getAdminLayout(<AdminUserLayout>{page}</AdminUserLayout>);

export default AdminUserLayout;
