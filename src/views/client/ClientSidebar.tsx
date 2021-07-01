import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import NavigationItem from 'jexity-app/layout/sidebar/NavigationItem';
import Sidebar from 'jexity-app/layout/sidebar/Sidebar';
import { useSidebarStore } from 'jexity-app/layout/sidebar/sidebarStore';
import { FC } from 'react';
import { DashboardIcon } from 'src/theme/icons/DashboardIcon';
import { ProfileIcon } from 'src/theme/icons/ProfileIcon';

const ClientSidebar: FC = () => {
  const { setToggleSidebar } = useSidebarStore();

  return (
    <Sidebar>
      <NavigationBlock>
        <NavigationItem
          href="/client"
          leftIcon={<DashboardIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          Dashboard
        </NavigationItem>
        <NavigationItem
          href="/client/profile"
          leftIcon={<ProfileIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          Mein Profil
        </NavigationItem>
      </NavigationBlock>
    </Sidebar>
  );
};

export default ClientSidebar;
