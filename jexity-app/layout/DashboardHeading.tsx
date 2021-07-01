import { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@chakra-ui/react';

export interface DashboardHeadingProps extends BoxProps {
  headerTopContent?: ReactNode;
}

const DashboardHeading: FC<DashboardHeadingProps> = ({ children, headerTopContent, ...boxProps }) => {
  return (
    <Box pos="sticky" zIndex={1} top={0} bg="white" borderBottom="1px solid" borderBottomColor="gray.300" {...boxProps}>
      {headerTopContent && (
        <Box mb={6} minH="26px">
          {headerTopContent}
        </Box>
      )}
      {children}
    </Box>
  );
};

export default DashboardHeading;
