import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import useMeasure from 'react-use-measure';
import { MeasuredBoxContext } from './useMeasuredBox';

/**
 * Helper component that fills a parent and measures itself and provides a useable
 * context. Use sparingly.
 * Example usage of this is for Virtualized Datatables where a fixed
 * height is necessary.
 */
const MeasuredBox: FC = ({ children }) => {
  const [ref, { height, width }] = useMeasure({
    scroll: false,
  });

  return (
    <MeasuredBoxContext.Provider value={{ height, width }}>
      <Box h="100%" w="100%" ref={ref}>
        {children}
      </Box>
    </MeasuredBoxContext.Provider>
  );
};

export default MeasuredBox;
