import { Modal, ModalHeader, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, Box } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ClientActivityForm, ClientEditFormProps } from '../forms/ClientActivityForm';

export interface ClientActivityFormModal extends ClientEditFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientActivityFormModal: FC<ClientActivityFormModal> = ({
  isOpen,
  activity,
  onCreateActivity,
  onUpdateActivity,
  onClose,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW="60vw">
        <ModalHeader fontSize="lg" fontWeight="bold" fontFamily="heading" color="gray.900">
          Aktivität hinzufügen
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={3}>
            <ClientActivityForm
              activity={activity}
              onCreateActivity={onCreateActivity}
              onUpdateActivity={onUpdateActivity}
              onCancel={onCancel}
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
