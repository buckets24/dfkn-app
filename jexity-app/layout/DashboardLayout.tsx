import { FC, ReactNode, useMemo } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { DashboardSideBar } from './DashboardSideBar';

export interface DashboardLayoutProps {
  header: ReactNode;
  sidebar: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, header, sidebar }) => {
  const { headerHeight, sidebarWidth } = useMemo(
    () => ({
      headerHeight: '64px',
      sidebarWidth: '295px',
    }),
    []
  );

  return (
    <SimpleGrid
      gridTemplateAreas="'header header' 'sidebar content' 'sidebar footer'"
      h="100%"
      gridTemplateColumns="min-content 1fr"
      gridTemplateRows="min-content 1fr"
      overflow="hidden"
      pos="relative"
    >
      <Box gridArea="header" h={headerHeight} w="100%">
        {header}
      </Box>
      <DashboardSideBar width={sidebarWidth}>{sidebar}</DashboardSideBar>
      <Box overflow="auto" gridArea="content">
        {children}
      </Box>
    </SimpleGrid>
  );
};

export default DashboardLayout;
