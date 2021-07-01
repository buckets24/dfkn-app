import { Box, Flex, Heading } from '@chakra-ui/react';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import TabbedNavigation from 'jexity-app/tabbed-navigation/TabbedNavigation';
import { FC } from 'react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { getClientLayout } from '../ClientLayout';

const ClientProfileLayout: FC = ({ children }) => {
  const me = useAuthStore(getMe);
  const { status, isLoading, data, error } = useClientByIdQuery(me?.id);

  return (
    <AuthGuard>
      <DashboardHeading pt={6} px={6}>
        <Flex justifyContent="space-between" alignItems="center" pt={5} pb={2}>
          <Heading as="h2" textTransform="capitalize" fontSize={['xl', null, null, '4xl']}>
            Profil
          </Heading>
          <Box id="form-actions-container" w="100%" />
        </Flex>
        <TabbedNavigation links={[{ label: 'Persönliche Daten', href: '/client/profile' }]} />
      </DashboardHeading>
      {status === 'success' && children}
    </AuthGuard>
  );
};

export const getClientProfileLayout: GetLayout = (page) =>
  getClientLayout(<ClientProfileLayout>{page}</ClientProfileLayout>);

export default ClientProfileLayout;
