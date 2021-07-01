import {
  Box,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { SettingsIcon } from 'jexity-app/icons/SettingsIcon';
import React, { FC } from 'react';
import AudioSettings from 'src/modules/audio-video-devices/AudioSettings';
import VideoSettings from 'src/modules/audio-video-devices/VideoSettings';
import { baseStyle } from './VideoControls';

export const SettingsModal: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        {...baseStyle}
        bg="gray.600"
        mr={0}
        aria-label="Settings"
        icon={
          <SettingsIcon width={['16px', null, null, null, '24px']} height="auto" _groupHover={{ color: 'white' }} />
        }
        onClick={() => {
          onOpen();
        }}
        _hover={{
          color: 'white',
          bg: 'brand.primary.500',
        }}
      />
      <Modal onClose={onClose} isOpen={isOpen} isCentered motionPreset="scale">
        <ModalOverlay />
        <ModalContent m="auto" p={5} bg="white" borderRadius="6px" minW={['90%', null, null, '935px']}>
          <ModalHeader fontFamily="heading" fontSize="xl" fontWeight="bold">
            Einstellungen
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" m="auto">
              <SimpleGrid gridTemplateColumns="1fr 1fr" columnGap={6} rowGap={6}>
                <AudioSettings />
                <VideoSettings />
              </SimpleGrid>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
