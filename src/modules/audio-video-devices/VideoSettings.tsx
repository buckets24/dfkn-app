import { AspectRatio, Box } from '@chakra-ui/react';
import { CameraSelection } from 'amazon-chime-sdk-component-library-react';
import React, { FC } from 'react';
import PreviewVideoModified from './PreviewVideoModified';

const VideoSettings: FC = () => {
  return (
    <>
      <CameraSelection label="Kamera" notFoundMsg="Keine Kamera gefunden" />
      <Box ml={8} rounded={6} overflow="hidden" w="95%">
        <AspectRatio ratio={16 / 9}>
          <Box>
            <PreviewVideoModified />
          </Box>
        </AspectRatio>
      </Box>
    </>
  );
};

export default VideoSettings;
