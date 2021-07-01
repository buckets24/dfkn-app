import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  UseDisclosureProps,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import useMeasure from 'react-use-measure';
import { PrintResponse } from './api/generatePDF';

export const DocumentPrintModel: FC<{
  onClose: NonNullable<UseDisclosureProps['onClose']>;
  isOpen: NonNullable<UseDisclosureProps['isOpen']>;
  loading: boolean;
  file: PrintResponse['base64'];
  documentId: string;
  filename: string;
}> = ({ onClose, isOpen, loading, file, documentId, filename }) => {
  const [ref, { height }] = useMeasure();

  return (
    <Box ref={ref} pos="absolute" h="100%">
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay zIndex={10}>
          <ModalContent w="90%" h="90%" maxW="none">
            <ModalHeader fontFamily="heading">Druckvorschau</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {loading ? (
                <Box py={5} bg="gray.100" h="100%">
                  <Box
                    px={12}
                    py={5}
                    maxW={{
                      base: '100%', // 0-48em
                      md: '780px', // 48em-80em,
                      xl: '850px', // 80em+
                    }}
                    w="100%"
                    mx="auto"
                    backgroundColor="white"
                    h="100%"
                    maxH={['100%', null, null, height - 150, null, '100%']}
                    overflowY={['scroll', null, null, null, 'hidden']}
                  >
                    <Flex mb={[0, null, null, 10]} w="100%">
                      <Skeleton w="100px" h="100px" />
                      <SkeletonText mt={4} ml={4} noOfLines={3} spacing={4} w="250px" h="auto" />
                    </Flex>
                    <SkeletonText mt={4} mb={[10, null, null, null, 16]} w="100%" h="auto" noOfLines={4} spacing={4} />
                    <SkeletonText mt={4} mb={[10, null, null, null, 16]} w="100%" h="auto" noOfLines={3} spacing={4} />
                    <SkeletonText mt={4} mb={[10, null, null, null, 16]} w="100%" h="auto" noOfLines={4} spacing={4} />
                    <SkeletonText mt={4} mb={[10, null, null, null, 16]} w="100%" h="auto" noOfLines={5} spacing={4} />
                    <SkeletonText mt={4} mb={[10, null, null, null, 16]} w="100%" h="auto" noOfLines={3} spacing={4} />
                  </Box>
                </Box>
              ) : (
                <>{file && <iframe width="100%" height="100%" src={file} />}</>
              )}
            </ModalBody>
            <ModalFooter>
              {documentId && file && (
                <Button
                  as="a"
                  bg="brand.primary.500"
                  color="white"
                  _hover={{ bg: 'brand.primary.900' }}
                  download={filename}
                  href={file}
                >
                  Datei downloaden
                </Button>
              )}
              <Button ml={4} onClick={onClose}>
                Abbrechen
              </Button>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
    </Box>
  );
};
