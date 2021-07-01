import { Box } from '@chakra-ui/react';
import React, { FC } from 'react';

const VideoConferenceContentContainer: FC<{ fullscreen: boolean }> = ({ fullscreen, children }) => (
  <Box
    pos="relative"
    minW={['450px', null, null, '728px', '806px', '832px']}
    bg="white"
    borderWidth="2px"
    borderColor="white"
    borderRadius="6px"
    {...(fullscreen
      ? {
          pos: 'absolute',
          top: 0,
          left: 0,
          w: '100%',
          h: '100%',
          borderRadius: 0,
        }
      : {})}
  >
    {children}
  </Box>
);

export default VideoConferenceContentContainer;
