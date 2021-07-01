import { Box, Flex, Heading } from '@chakra-ui/react';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import TabbedNavigation from 'jexity-app/tabbed-navigation/TabbedNavigation';
import { FC } from 'react';
import AgentModel from 'src/modules/agent/api/AgentModel';
import useAgentByIdQuery from 'src/modules/agent/query-hooks/useAgentByIdQuery';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { getAgentLayout } from '../AgentLayout';

const AgentProfileLayout: FC = ({ children }) => {
  const me = useAuthStore(getMe) as AgentModel | undefined;
  const { status, isLoading, data, error } = useAgentByIdQuery(me?.id);

  return (
    <AuthGuard>
      <DashboardHeading pt={6} px={6}>
        <Flex justifyContent="space-between" alignItems="center" pt={5} pb={2}>
          <Heading as="h2" textTransform="capitalize" fontSize={['xl', null, null, '4xl']}>
            Profil
          </Heading>
          <Box id="form-actions-container" w="100%" />
        </Flex>
        <TabbedNavigation
          links={[
            { label: 'Persönliche Daten', href: '/agent/profile' },
            // {
            //   label: 'Dokumente',
            //   href: '/agent/profile/documents',
            //   as: `/agent/profile/documents`,
            // },
            // {
            //   label: 'Kunden Insights',
            //   href: '/agent/profile/insights',
            //   as: `/agent/profile/insights`,
            // },
          ]}
        />
      </DashboardHeading>
      {status === 'success' && children}
    </AuthGuard>
  );
};

export const getAgentProfileLayout: GetLayout = (page) =>
  getAgentLayout(<AgentProfileLayout>{page}</AgentProfileLayout>);

export default AgentProfileLayout;
