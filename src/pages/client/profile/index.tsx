import { Box, useToast } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { getMe, isClient, useAuthStore } from 'src/modules/auth/authStore';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import { ClientEditForm } from 'src/modules/client/forms/ClientEditForm';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { getClientProfileLayout } from 'src/views/client/profile/ClientProfileLayout';
import { gotoLogin } from 'src/views/common/routing';

const ClientProfile: FC & HasLayout = () => {
  const me = useAuthStore(getMe);
  const router = useRouter();
  const toast = useToast();

  useClientByIdQuery(me?.id, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useClientByIdQuery AgentProfile', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });

  return (
    <Box p={6} pos="relative">
      {me && isClient(me) && <ClientEditForm client={me as any} />}
    </Box>
  );
};

ClientProfile.getLayout = getClientProfileLayout;

export default ClientProfile;
