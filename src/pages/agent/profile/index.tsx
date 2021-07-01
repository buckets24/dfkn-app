import { Grid, useToast } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { agentToastLoadingUnknowErr } from 'src/modules/agent/agentMsg';
import { AgentEditForm } from 'src/modules/agent/forms/AgentEditForm';
import useAgentByIdQuery from 'src/modules/agent/query-hooks/useAgentByIdQuery';
import { getMe, isAgent, useAuthStore } from 'src/modules/auth/authStore';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { getAgentProfileLayout } from 'src/views/agents/profile/AgentProfileLayout';
import { gotoLogin } from 'src/views/common/routing';

const AgentProfile: FC & HasLayout = () => {
  const me = useAuthStore(getMe);
  const router = useRouter();
  const toast = useToast();

  useAgentByIdQuery(me?.id, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useAgentByIdQuery AgentProfile', e);
      toast(agentToastLoadingUnknowErr(errorCode));
    },
  });

  return (
    <Grid p={6} pos="relative" templateColumns={['1fr', null, null, 'repeat(2, 1fr)']} gap={10}>
      {/* TODO: Fix this once auth store has been updated to not use agent model */}
      {me && isAgent(me) && <AgentEditForm agent={me as any} />}
      {/* Not yet functional disabling for now */}
      {/* <AgentBankDetailsForm mr={20} maxH={['100%', null, null, '345px']} w={['100%', null, null, 'auto']} /> */}
    </Grid>
  );
};

AgentProfile.getLayout = getAgentProfileLayout;

export default AgentProfile;
