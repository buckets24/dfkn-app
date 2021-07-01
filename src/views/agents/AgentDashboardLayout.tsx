import { FC } from 'react';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import { getAgentLayout } from './AgentLayout';
import { Grid } from '@chakra-ui/react';

const AgentDashboardLayout: FC = ({ children }) => {
  return (
    <Grid templateColumns={['1fr', null, null, '1fr 1fr 1fr min-content']} alignItems="start" gap={5} p={6}>
      {children}
    </Grid>
  );
};

export const getAgentDashboardLayout: GetLayout = (page) =>
  getAgentLayout(<AgentDashboardLayout>{page}</AgentDashboardLayout>);

// noinspection JSUnusedGlobalSymbols
export default AgentDashboardLayout;
