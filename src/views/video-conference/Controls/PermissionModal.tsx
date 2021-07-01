import { FC, useEffect, useState } from 'react';
import {
  Fade,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SlideFade,
  Text,
} from '@chakra-ui/react';
import { SettingsIcon } from 'jexity-app/icons/SettingsIcon';

interface PermissionDeniedModalProps {
  onAllowMicPermission: () => void;
}
export const PermissionModal: FC<PermissionDeniedModalProps> = ({ onAllowMicPermission }) => {
  const [showPermissionModal, setShowPermissionModal] = useState<boolean>(true);
  const [micPermissionAccepted, setMicPermissionAccepted] = useState<boolean>(false);
  const [cameraPermissionAccepted, setCameraPermissionAccepted] = useState<boolean>(false);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        /**
         * Permission was allowed therefore join the meeting
         */
        setShowPermissionModal(false);
        setMicPermissionAccepted(true);
        onAllowMicPermission();
      })
      .catch((e) => {
        setMicPermissionAccepted(false);
      });
  }, []);

  return (
    <Fade in={showPermissionModal}>
      <Modal
        isOpen={showPermissionModal}
        onClose={() => setShowPermissionModal(false)}
        isCentered
        closeOnEsc={micPermissionAccepted}
        closeOnOverlayClick={micPermissionAccepted}
      >
        <ModalOverlay zIndex={1}>
          <SlideFade in={showPermissionModal}>
            <ModalContent>
              {micPermissionAccepted && <ModalCloseButton />}
              <ModalBody py={5}>
                <Heading my={4} as="h2" fontSize="xl" color="brand.secondary.900">
                  {!micPermissionAccepted && cameraPermissionAccepted
                    ? 'Mikrofon ist'
                    : !cameraPermissionAccepted && micPermissionAccepted
                    ? 'Kamera ist'
                    : 'Kamera und Mikrofon sind'}{' '}
                  blockiert
                </Heading>
                <Text>
                  Die Anwendung braucht den Zugriff auf Ihre Kamera und Ihr Mikrofon. Klicken Sie den <SettingsIcon />{' '}
                  Button unten in der Leiste, um Ihre Geräte einzustellen.
                </Text>
              </ModalBody>
            </ModalContent>
          </SlideFade>
        </ModalOverlay>
      </Modal>
    </Fade>
  );
};
