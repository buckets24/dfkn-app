import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SlideFade,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import { API } from 'aws-amplify';
import React, { FC } from 'react';
import { useMutation } from 'react-query';
import { OnlineDocumentStatus } from 'src/API';
import { updateDocument } from './documentService';

interface DocumentLockModalProps extends UseDisclosureReturn {
  onLockStart?: () => void;
  onLockFinish?: () => void;
  documentId: string;
}

export const DocumentLockModal: FC<DocumentLockModalProps> = ({
  onClose,
  isOpen,
  documentId,
  onLockStart,
  onLockFinish,
}) => {
  const { data, isLoading, mutate } = useMutation(
    async () => {
      return await updateDocument(
        {
          id: documentId,
          status: OnlineDocumentStatus.LOCK,
        },
        API
      );
    },
    {
      onMutate: () => {
        onLockStart?.();
      },
      onSettled: () => {
        onClose();
        onLockFinish?.();
      },
    }
  );

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay zIndex={2}>
        <SlideFade in={isOpen}>
          <ModalContent>
            <ModalHeader>Dokument abschließen?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Sind Sie sicher, dass das Dokument vollständig ausgefüllt wurde? Nach dem Abschließen sind keine
              Änderungen mehr möglich.
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                onClick={() => mutate()}
                bg="brand.tertiary.500"
                color="white"
                _hover={{
                  bg: 'brand.tertiary.900',
                }}
              >
                Abschließen
              </Button>
              <Button ml={4} onClick={onClose} isDisabled={isLoading}>
                Abbrechen
              </Button>
            </ModalFooter>
          </ModalContent>
        </SlideFade>
      </ModalOverlay>
    </Modal>
  );
};
