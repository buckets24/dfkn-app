import { AspectRatio, AspectRatioProps, Box } from '@chakra-ui/react';
import { FC } from 'react';

const VideoContainer: FC<AspectRatioProps> = ({ children, ...props }) => {
  return (
    <AspectRatio ratio={16 / 9} {...props}>
      <Box>{children}</Box>
    </AspectRatio>
  );
};

export default VideoContainer;
