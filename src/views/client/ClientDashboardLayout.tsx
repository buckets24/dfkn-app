import { FC } from 'react';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import { getClientLayout } from './ClientLayout';
import { Grid } from '@chakra-ui/react';

const ClientDashboardLayout: FC = ({ children }) => {
  return (
    <Grid templateColumns={['1fr', null, null, 'repeat(auto-fit, minmax(647px, 1fr))']} gap={[5, null, null, 10]} p={6}>
      {children}
    </Grid>
  );
};

export const getClientDashboardLayout: GetLayout = (page) =>
  getClientLayout(<ClientDashboardLayout>{page}</ClientDashboardLayout>);

// noinspection JSUnusedGlobalSymbols
export default ClientDashboardLayout;
