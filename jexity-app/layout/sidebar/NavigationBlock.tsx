import { FC } from 'react';
import { Box } from '@chakra-ui/react';

const NavigationBlock: FC = ({ children }) => {
  return (
    <Box>
      <Box mt={5} mx={5}>
        {children}
      </Box>
    </Box>
  );
};

export default NavigationBlock;
