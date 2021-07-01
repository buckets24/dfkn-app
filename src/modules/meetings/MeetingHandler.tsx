import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import {
  useLocalVideo,
  useMeetingManager,
  useRosterState,
  useVideoInputs,
} from 'amazon-chime-sdk-component-library-react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { PermissionModal } from 'src/views/video-conference/Controls/PermissionModal';
import AudioSettings from '../audio-video-devices/AudioSettings';
import VideoSettings from '../audio-video-devices/VideoSettings';
import { getMe, useAuthStore } from '../auth/authStore';
import useClientByIdQuery from '../client/query-hooks/useClientByIdQuery';
import { formatSalutation } from '../common/utils';
import { meetingToastSwitchingVideoErr } from './meetingsMsg';
import useMeetingByIdQuery from './query-hooks/useMeetingByIdQuery';
import { JoinMeetingOutput } from './requestChimeMeeting';

/**
 * Could be called MeetingManager, but the chime sdk react lib
 * has its own definition of MeetingManager.
 */
const MeetingHandler: FC<JoinMeetingOutput> = ({ attendee, meeting }) => {
  const meetingManager = useMeetingManager();
  const { query } = useRouter();
  const meetingId = typeof query.id === 'string' ? query.id : undefined;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const me = useAuthStore(getMe);
  const { toggleVideo, isVideoEnabled } = useLocalVideo();
  const [joinWithCamera, setJoinWithCamera] = useState<boolean>(false);
  const { roster } = useRosterState();
  const { devices: cameraDevices, selectedDevice: activeCameraDevice } = useVideoInputs();
  const toast = useToast();

  const { data: activeMeeting } = useMeetingByIdQuery(meetingId, { enabled: false });

  const { data: client } = useClientByIdQuery(activeMeeting?.clientId, {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const rosterAsArray = Object.values(roster);
    if (rosterAsArray.find((r) => r.externalUserId === me?.sub)) {
      if (joinWithCamera && isVideoEnabled === false) {
        toggleVideo().catch((e) => {
          const errorCode = log(LogLevel.error, e, { label: 'MeetingHandler', ...e });
          toast(meetingToastSwitchingVideoErr(errorCode));
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roster, me?.sub]);

  useEffect(() => {
    if (me?.sub) {
      meetingManager.getAttendee = async (chimeAttendeeId: string, externalUserId?: string) => {
        let name;

        /**
         * Map ME based on the id
         */
        if (me.sub === externalUserId) {
          name = `${me.firstName} ${me.lastName}`;
        } else if (client && client.sub === externalUserId) {
          name = formatSalutation(client);
        } else {
          /**
           * Handle moderator agent
           */
          name = activeMeeting?.moderatorName ?? '';
        }
        return {
          name: name,
        };
      };
    }
  }, [me, client, meetingManager, activeMeeting?.moderatorName]);

  const joinMeeting = useCallback<(withCamera?: boolean) => void>(
    async (withCamera = false) => {
      await meetingManager.start();
      if (withCamera && isVideoEnabled === false) {
        setJoinWithCamera(true);
      }
      onClose();
    },
    [meetingManager, isVideoEnabled, onClose]
  );

  return (
    <>
      <PermissionModal
        onAllowMicPermission={async () => {
          await meetingManager.join({
            meetingInfo: meeting,
            attendeeInfo: attendee,
          });
          onOpen();
        }}
      />
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered>
        <ModalOverlay />
        <ModalContent m="auto" p={5} bg="white" borderRadius="6px" minW={['90%', null, null, '935px']}>
          <ModalHeader fontFamily="heading" fontSize="xl" fontWeight="bold">
            Einstellungen
          </ModalHeader>
          <ModalBody>
            <Box w="100%" m="auto">
              <SimpleGrid gridTemplateColumns="1fr 1fr" columnGap={6} rowGap={6}>
                <AudioSettings />
                <VideoSettings />
              </SimpleGrid>
            </Box>
          </ModalBody>
          <ModalFooter>
            {cameraDevices.length > 0 && !!activeCameraDevice && (
              <Button colorScheme="brand.primary" onClick={() => joinMeeting(true)} mr="10px">
                Mit Kamera teilnehmen
              </Button>
            )}
            <Button colorScheme="brand.secondary" onClick={() => joinMeeting()}>
              Ohne Kamera teilnehmen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MeetingHandler;
