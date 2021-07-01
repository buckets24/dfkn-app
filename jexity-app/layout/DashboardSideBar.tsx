import { FC } from 'react';
import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay } from '@chakra-ui/react';
import { useSidebarStore } from './sidebar/sidebarStore';

export const DashboardSideBar: FC<{ width: string }> = ({ width, children }) => {
  const { toggleSidebar, setToggleSidebar } = useSidebarStore();
  return (
    <Box
      gridArea="sidebar"
      w={[0, null, null, null, width]}
      h="100%"
      borderRight="1px solid"
      borderRightColor="gray.300"
    >
      <Box d={['none', null, null, null, 'block']} h="100%">
        {children}
      </Box>
      <Box d={['block', null, null, null, 'none']} h="100%">
        <Drawer isOpen={toggleSidebar} placement="left" onClose={() => setToggleSidebar(!toggleSidebar)}>
          <DrawerOverlay zIndex={5}>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Box>
    </Box>
  );
};
