import { Box, useToast } from '@chakra-ui/react';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import { ContractorEditForm } from 'src/modules/client/forms/ContractorEditForm';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { getAgentClientLayout } from 'src/views/agents/client-management/AgentClientLayout';
import { gotoAgentClients } from 'src/views/common/routing';

const ContractorEditBasicInfo: FC & HasLayout = () => {
  const router = useRouter();
  const id = routerQueryGetAsString(router.query.id);
  const toast = useToast();
  const { isLoading, data, error } = useClientByIdQuery(id, {
    /**
     * Rely on the Layout to request the data. So we disable it here. It will never
     * be stale
     */
    enabled: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoAgentClients(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useClientByIdQuery() in ContractorEditBasicInfo', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });

  return (
    <Box pos="relative" p={6}>
      <ContractorEditForm client={data} />
    </Box>
  );
};

ContractorEditBasicInfo.getLayout = getAgentClientLayout;

export default ContractorEditBasicInfo;
