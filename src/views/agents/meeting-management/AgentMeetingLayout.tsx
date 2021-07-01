import { Heading, Link } from '@chakra-ui/react';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { ArrowIcon } from 'src/theme/icons/ArrowIcon';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { getAgentLayout } from '../AgentLayout';

const AgentMeetingManagementLayout: FC = ({ children }) => {
  const { query } = useRouter();

  /**
   * TODO READD THE NAME OF THE CLIENT
   */

  return (
    <AuthGuard>
      <DashboardHeading
        pt={6}
        px={6}
        headerTopContent={
          <NextLink passHref href="/agent/meetings">
            <Link d="inline-flex" alignItems="center" _hover={{ textDecor: 'none', color: 'brand.primary.500' }}>
              <ArrowIcon direction="left" mr={2} />
              Zurück zur Meetingverwaltung
            </Link>
          </NextLink>
        }
      >
        <Heading as="h2" mb={8}>
          Meeting
        </Heading>
      </DashboardHeading>
      {children}
    </AuthGuard>
  );
};

export const getAgentMeetingManagementLayout: GetLayout = (page) =>
  getAgentLayout(<AgentMeetingManagementLayout>{page}</AgentMeetingManagementLayout>);

export default AgentMeetingManagementLayout;
