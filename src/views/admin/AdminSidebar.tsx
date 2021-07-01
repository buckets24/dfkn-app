import React, { FC } from 'react';
import Sidebar from 'jexity-app/layout/sidebar/Sidebar';
import NavigationBlock from 'jexity-app/layout/sidebar/NavigationBlock';
import NavigationItem from 'jexity-app/layout/sidebar/NavigationItem';
import { UsersIcon } from 'src/theme/icons/UsersIcon';
import { useSidebarStore } from 'jexity-app/layout/sidebar/sidebarStore';

const AdminSidebar: FC = () => {
  const { setToggleSidebar } = useSidebarStore();

  return (
    <Sidebar>
      <NavigationBlock>
        <NavigationItem href="/admin" leftIcon={<UsersIcon w={30} />} mb={3} onClick={() => setToggleSidebar(false)}>
          Benutzermanagement
        </NavigationItem>
        <NavigationItem
          href="/admin/no-cognito-agents"
          leftIcon={<UsersIcon w={30} />}
          mb={3}
          onClick={() => setToggleSidebar(false)}
        >
          No cognito agents
        </NavigationItem>
      </NavigationBlock>
    </Sidebar>
  );
};

export default AdminSidebar;
