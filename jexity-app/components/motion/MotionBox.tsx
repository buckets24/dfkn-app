import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const MotionBox = forwardRef<HTMLDivElement, Omit<BoxProps, 'transition'>>((props, ref) => {
  return <Box ref={ref} {...props} />;
});

export default motion(MotionBox);
