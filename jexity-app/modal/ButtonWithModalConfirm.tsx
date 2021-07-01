import {
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
import React, { FC, ReactNode } from 'react';

export interface ButtonWithModalProps {
  disclosure?: UseDisclosureReturn;
  onConfirm?: () => void;
  confirmText: ReactNode;
  isLoading?: boolean;

  modalHeader: ReactNode;
  modalBody: ReactNode;

  buttonStyles?: ButtonProps;

  scheme: 'DELETE' | 'PRIMARY_BRAND'; // Should probably add green 'CONFIRM'. Rushing to just get it working sorry!
}
export const ButtonWithModal: FC<ButtonWithModalProps> = ({
  disclosure,
  onConfirm,
  confirmText,
  isLoading = false,
  children,
  modalHeader,
  modalBody,
  buttonStyles,
  scheme,
}) => {
  const localDisclosure = useDisclosure();

  const { isOpen, onClose } = disclosure ?? localDisclosure;

  return (
    <Button {...buttonStyles}>
      {children}
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
                    onClick={onConfirm}
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
    </Button>
  );
};
