import { Box } from '@chakra-ui/react';
import { GetLayout } from 'jexity-app/layout/layoutApi';
import React, { FC } from 'react';
import { SiteHeader, SiteHeaderProps } from './SiteHeader';

const SiteLayout: FC<SiteHeaderProps> = ({ children, ...siteHeaderProps }) => {
  return (
    <Box>
      <SiteHeader {...siteHeaderProps} />
      <Box maxW="1200px" w="100%" fontSize="3xl" m="auto" p={8}>
        {children}
      </Box>
    </Box>
  );
};

export const getSiteLayout: GetLayout = (page) => <SiteLayout>{page}</SiteLayout>;

export default SiteLayout;
