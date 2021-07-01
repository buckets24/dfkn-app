import { Box, SimpleGrid } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import MotionBox from 'jexity-app/components/motion/MotionBox';
import React, { FC, useEffect, useRef } from 'react';
import SizeToggleButton from './SizeToggleButton';
import useDocumentGuidePosition, { DocumentGuideSize } from './useDocumentGuidePosition';

export interface DocumentGuideProps {
  isVisible: boolean;
}
const DocumentGuide: FC<DocumentGuideProps> = ({ isVisible, children }) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const showGuide = useDocumentGuidePosition((s) => s.showGuide);
  const guideSize = useDocumentGuidePosition((s) => s.size);
  const setGuideSize = useDocumentGuidePosition((s) => s.setSize);

  const wrapperWidth = {
    SMALL: '20vw',
    MEDIUM: '24vw',
    LARGE: '28vw',
  };

  const wrapperHeight = {
    SMALL: '60vh',
    MEDIUM: '70vh',
    LARGE: '85vh',
  };

  return isVisible ? (
    <AnimatePresence>
      {showGuide && (
        <MotionBox
          ref={constraintsRef}
          w="100%"
          h="100%"
          pointerEvents="none"
          key="actual-guide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <MotionBox
            drag
            dragMomentum={false}
            dragConstraints={constraintsRef}
            zIndex={1}
            d="inline-grid"
            gridTemplateRows="min-content 1fr"
            borderRadius="6px"
            overflow="hidden"
            minW="275px"
            layout
            w={wrapperWidth[guideSize]}
            maxH={wrapperHeight[guideSize]}
            boxShadow="0px 6px 47px rgba(38, 78, 118, 0.4)"
            pointerEvents="all"
            pos="absolute"
            right="175px"
            bottom="120px"
          >
            <Box bg="gray.200">
              <SimpleGrid columnGap={2} gridTemplateColumns="min-content min-content min-content" p={3}>
                <SizeToggleButton
                  isActive={guideSize === DocumentGuideSize.SMALL}
                  onClick={() => setGuideSize(DocumentGuideSize.SMALL)}
                >
                  S
                </SizeToggleButton>
                <SizeToggleButton
                  isActive={guideSize === DocumentGuideSize.MEDIUM}
                  onClick={() => setGuideSize(DocumentGuideSize.MEDIUM)}
                >
                  M
                </SizeToggleButton>
                <SizeToggleButton
                  isActive={guideSize === DocumentGuideSize.LARGE}
                  onClick={() => setGuideSize(DocumentGuideSize.LARGE)}
                >
                  L
                </SizeToggleButton>
              </SimpleGrid>
            </Box>
            <DocumentGuideScrollContent>{children}</DocumentGuideScrollContent>
          </MotionBox>
        </MotionBox>
      )}
    </AnimatePresence>
  ) : null;
};

/**
 * Needs to be a separate component to avoid triggering drag position re-render
 * if `currentActive` changes.
 */
const DocumentGuideScrollContent: FC = ({ children }) => {
  const guideRef = useRef<HTMLDivElement>(null);
  const currentActive = useDocumentGuidePosition((s) => s.currentActive);

  useEffect(() => {
    const scrollElement = guideRef.current;
    if (scrollElement && currentActive) {
      const offsetTop = document.getElementById(currentActive)?.offsetTop;
      if (offsetTop) {
        scrollElement.scrollTo({
          behavior: 'smooth',
          // TODO. Need to figure out why 50 is required and why offsetTop isn't exact.
          top: offsetTop - 50,
        });
      }
    }
  }, [currentActive]);

  return (
    <Box ref={guideRef} data-component="content-container" h="70vh" overflowX="hidden" overflowY="auto" bgColor="white">
      {children}
    </Box>
  );
};

export default DocumentGuide;
