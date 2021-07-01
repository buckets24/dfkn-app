import { FC, ReactNode } from 'react';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useDocFormMeta } from '../../useDocFormMeta';

export interface PageWrapperProps extends BoxProps {
  footer?: ReactNode;
}

export const PageWrapper: FC<PageWrapperProps> = ({ children, footer, ...boxProps }) => {
  const { printMode } = useDocFormMeta();
  /**
   * Dimensions of the paper in pixels is not accurate
   * maxW/maxH was calculted via aspect ratio rather than a fixed value found on the internet.
   *
   */
  return (
    <>
      <Flex
        pos="relative"
        flexDir="column"
        justifyContent="space-between"
        w="100%"
        h={printMode ? '100vh' : '100%'}
        backgroundColor="white"
        {...boxProps}
      >
        <Box flexGrow={1}>{children}</Box>
        <Box flexShrink={0} flexGrow={0}>
          {footer && footer}
        </Box>
        {!printMode && <Box boxShadow="none" h={12} />}
      </Flex>

      <div className="page-break" />
    </>
  );
};
