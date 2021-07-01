import {
  Box,
  Button,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { EndCallIcon } from 'jexity-app/icons/EndCallIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { meetingToastClientEndMeetingSuccess } from 'src/modules/meetings/meetingsMsg';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import { baseStyle } from './VideoControls';

export const EndCallModal: FC = () => {
  const { query } = useRouter();
  const id = typeof query.id === 'string' ? query.id : undefined;

  const { data: activeMeeting } = useMeetingByIdQuery(id, {
    enabled: false,
  });

  const meetingManager = useMeetingManager();
  const router = useRouter();
  const me = useAuthStore(getMe);
  const clientId = activeMeeting?.clientId;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleEndCall = async () => {
    await meetingManager.leave();
    setIsLoading(true);
    if (activeMeeting) {
      log(LogLevel.info, 'LEAVE_MEETING', {
        label: 'EndCallModal',
        message: `The ${me?.userType.toLowerCase()} has left the meeting ${activeMeeting.id}`,
      });
    }
    if (me?.userType === 'AGENT' && clientId) {
      void router.push(`/agent/clients/${clientId}/documents`);
    } else {
      void router.push(`/client`);
      toast(meetingToastClientEndMeetingSuccess());
    }
    setIsLoading(false);
  };

  return (
    <>
      <IconButton
        {...baseStyle}
        background="support.alert.600"
        color="white"
        aria-label="EndCall"
        icon={<EndCallIcon width={['16px', null, null, null, '24px']} height="auto" _groupHover={{ color: 'white' }} />}
        onClick={() => {
          onOpen();
        }}
      />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent m="auto" p={5} bg="white" borderRadius="6px" minW={['50%', null, null, '500px']}>
          <ModalHeader fontFamily="heading" fontSize="xl" fontWeight="bold">
            Meeting verlassen.
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%" m="auto">
              <>
                <Heading as="h3" fontSize="lg">
                  Möchten Sie das Meeting jetzt verlassen?
                </Heading>
                <Stack direction="row" spacing={4} mt={5}>
                  <Button
                    isLoading={isLoading}
                    bg="brand.primary.500"
                    color="white"
                    _hover={{
                      bg: 'brand.primary.900',
                    }}
                    onClick={handleEndCall}
                  >
                    Jetzt verlassen
                  </Button>
                  <Button
                    borderWidth="1px"
                    borderColor="brand.primary.500"
                    borderRadius="4px"
                    color="brand.primary.500"
                    _hover={{
                      bg: 'brand.primary.100',
                    }}
                    onClick={onClose}
                  >
                    Abbrechen
                  </Button>
                </Stack>
              </>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
