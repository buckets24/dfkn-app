import { FC } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

const Card: FC<BoxProps> = ({ children, ...boxProps }) => {
  return (
    <Box
      background="white"
      boxShadow="0px 1px 0px rgba(63, 63, 68, 0.05), 0px 1px 3px rgba(63, 63, 68, 0.15)"
      borderRadius="4px"
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default Card;
