import { Dispatch, FC, SetStateAction, useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  UseDisclosureProps,
  Fade,
  SlideFade,
} from '@chakra-ui/react';

export interface DataTableModalProps extends UseDisclosureProps {
  header: string;
  body: string;
  confirmText: string;
  onConfirm: (setIsLoading: Dispatch<SetStateAction<boolean>>) => void;
}

const DataTableModal: FC<DataTableModalProps> = ({ header, body, onClose, isOpen, confirmText, onConfirm }) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!onClose || !isOpen) {
    return null;
  }

  return (
    <Fade in={isOpen}>
      <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
        <ModalOverlay zIndex={2}>
          <SlideFade in={isOpen}>
            <ModalContent>
              <ModalHeader>{header}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                <Button
                  isLoading={isLoading}
                  onClick={() => onConfirm(setIsLoading)}
                  bg={confirmText === 'Löschen' ? 'support.alert.500' : 'brand.primary.500'}
                  color="white"
                  _hover={{ bg: confirmText === 'Löschen' ? 'support.alert.600' : 'brand.primary.900' }}
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
  );
};

export default DataTableModal;
