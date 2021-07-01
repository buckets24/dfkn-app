import { CalendarIcon } from 'jexity-app/icons/CalendarIcon';
import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import NavigationItem from 'jexity-app/layout/sidebar/NavigationItem';
import Sidebar from 'jexity-app/layout/sidebar/Sidebar';
import { useSidebarStore } from 'jexity-app/layout/sidebar/sidebarStore';
import { FC } from 'react';
import { DashboardIcon } from 'src/theme/icons/DashboardIcon';
import { ProfileIcon } from 'src/theme/icons/ProfileIcon';
import { UsersIcon } from 'src/theme/icons/UsersIcon';

const AgentSidebar: FC = () => {
  const { setToggleSidebar } = useSidebarStore();

  return (
    <Sidebar>
      <NavigationBlock>
        <NavigationItem
          href="/agent"
          leftIcon={<DashboardIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          Dashboard
        </NavigationItem>
        <NavigationItem
          href="/agent/clients"
          leftIcon={<UsersIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          Kundenmanagement
        </NavigationItem>
        <NavigationItem
          href="/agent/meetings"
          leftIcon={<CalendarIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          Meetingverwaltung
        </NavigationItem>
        <NavigationItem
          href="/agent/profile"
          leftIcon={<ProfileIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          Profil
        </NavigationItem>
        {/* Not yet functional disabling for now */}
        {/* <NavigationItem
          href="/dashboard"
          leftIcon={<ChallengesIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          Herausforderungen
        </NavigationItem> */}
      </NavigationBlock>
    </Sidebar>
  );
};

export default AgentSidebar;
