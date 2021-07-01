import React, { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';
import { useDocFormMeta } from '../../useDocFormMeta';

export const DocumentWrapper: FC<BoxProps> = ({ children, ...boxProps }) => {
  const { printMode } = useDocFormMeta();
  /**
   * Dimensions of the paper in pixels is not accurate
   * maxW/maxH was calculted via aspect ratio rather than a fixed value found on the internet.
   *
   */
  return (
    <Box
      maxW={{
        base: '100%', // 0-48em
        md: '780px', // 48em-80em,
        xl: '850px', // 80em+
      }}
      boxSizing="border-box"
      w="100%"
      mx="auto"
      backgroundColor="white"
      {...(!printMode && { boxShadow: '0px 4px 8px rgba(26, 26, 26, 0.2)', ...boxProps })}
    >
      {children}
    </Box>
  );
};
