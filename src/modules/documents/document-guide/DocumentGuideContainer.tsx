import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

const DocumentGuideContainer: FC<BoxProps> = ({ children, ...otherProps }) => {
  return (
    <Box pos="fixed" w="100%" h="100%" top={0} left={0} zIndex={4} pointerEvents="none" {...otherProps}>
      {children}
    </Box>
  );
};

export default DocumentGuideContainer;
