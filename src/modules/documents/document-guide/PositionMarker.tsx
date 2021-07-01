import { IconButton } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import MotionBox from 'jexity-app/components/motion/MotionBox';
import React, { FC } from 'react';
import { BookIcon } from 'src/theme/icons/BookIcon';
import useDocumentGuidePosition from './useDocumentGuidePosition';

export interface PositionMarkerProps {
  name: string;
}

const PositionMarker: FC<PositionMarkerProps> = ({ name }) => {
  const setCurrentActive = useDocumentGuidePosition((s) => s.setCurrentActive);
  const currentActive = useDocumentGuidePosition((s) => s.currentActive);
  const showGuide = useDocumentGuidePosition((s) => s.showGuide);

  return (
    <AnimatePresence>
      {showGuide && (
        <MotionBox
          h="0px"
          width="100%"
          backgroundColor="black"
          pos="relative"
          float="left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <IconButton
            aria-label={name}
            data-component={name}
            colorScheme="brand.primary"
            icon={<BookIcon color="white" />}
            pos="relative"
            right={140}
            transform="translateX(50%)"
            onClick={() => setCurrentActive(name)}
            disabled={currentActive === name}
            borderRadius="50%"
          />
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default PositionMarker;
