import { Box, Spinner, useToast } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import { useRouter } from 'next/router';
import { FC, useCallback } from 'react';
import { agentMsgLoadingLabel, agentToastLoadingUnknowErr } from 'src/modules/agent/agentMsg';
import { AgentEditForm, AgentEditFormProps } from 'src/modules/agent/forms/AgentEditForm';
import useAgentByIdQuery from 'src/modules/agent/query-hooks/useAgentByIdQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { getAdminUserLayout } from 'src/views/admin/user-management/AdminUserLayout';
import { gotoAdminHome } from 'src/views/common/routing';

const AgentEditPage: FC & HasLayout = () => {
  const router = useRouter();
  const id = routerQueryGetAsString(router.query.id);
  const toast = useToast();

  const { isLoading, data, error } = useAgentByIdQuery(id, {
    enabled: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoAdminHome(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useAgentByIdQuery in AgentEditPage', {
        label: agentMsgLoadingLabel,
        ...e,
      });
      toast(agentToastLoadingUnknowErr(errorCode));
    },
  });

  const onCreateAgent = useCallback<NonNullable<AgentEditFormProps['onCreateAgent']>>(
    (createdAgent) => {
      if (createdAgent?.id) {
        void router.push(createdAgent.id);
      }
    },
    [router]
  );

  return (
    <Box pos="relative" maxW="1000px" p={6}>
      {isLoading ? (
        <Spinner mt={4} emptyColor="#5771DB" color="#63D9CC" thickness="4px" size="lg" />
      ) : (
        <AgentEditForm agent={data} onCreateAgent={onCreateAgent} />
      )}
    </Box>
  );
};

AgentEditPage.getLayout = getAdminUserLayout;

export default AgentEditPage;
