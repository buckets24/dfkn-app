import {
  Box,
  Button,
  ButtonProps,
  Fade,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  useDisclosure,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import React, { FC, ReactNode, useState } from 'react';

export interface WithModalProps {
  disclosure?: UseDisclosureReturn;
  onConfirm?: () => Promise<void>;
  confirmText: ReactNode;

  modalHeader: ReactNode;
  modalBody: ReactNode;

  scheme: 'DELETE' | 'PRIMARY_BRAND'; // Should probably add green 'CONFIRM'. Rushing to just get it working sorry!
}
export const WithModal: FC<WithModalProps> = ({
  disclosure,
  onConfirm,
  confirmText,
  children,
  modalHeader,
  modalBody,
  scheme,
}) => {
  const localDisclosure = useDisclosure();

  const { isOpen, onClose, onOpen } = disclosure ?? localDisclosure;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Box
        d="inline"
        onClick={() => {
          onOpen();
        }}
      >
        {children}
      </Box>
      <Fade in={isOpen}>
        <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
          <ModalOverlay zIndex={2}>
            <SlideFade in={isOpen}>
              <ModalContent>
                <ModalHeader>{modalHeader}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{modalBody}</ModalBody>
                <ModalFooter>
                  <Button
                    isLoading={isLoading}
                    onClick={async () => {
                      setIsLoading(true);
                      await onConfirm?.();
                      setIsLoading(false);
                      onClose();
                    }}
                    bg={scheme === 'DELETE' ? 'support.alert.500' : 'brand.primary.500'}
                    color="white"
                    _hover={{ bg: scheme === 'DELETE' ? 'support.alert.600' : 'brand.primary.900' }}
                  >
                    {confirmText}
                  </Button>
                  <Button ml={4} onClick={onClose} isDisabled={isLoading}>
                    Abbrechen
                  </Button>
                </ModalFooter>
              </ModalContent>
            </SlideFade>
          </ModalOverlay>
        </Modal>
      </Fade>
    </>
  );
};
