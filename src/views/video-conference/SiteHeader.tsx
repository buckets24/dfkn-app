import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { NessyCloudLogo } from 'src/theme/icons/NessyCloudLogo';

export interface SiteHeaderProps {
  color?: string;
}

export const SiteHeader: FC<SiteHeaderProps> = () => {
  return (
    <Box p={4}>
      <NessyCloudLogo />
    </Box>
  );
};
