import { BoxProps, Flex } from '@chakra-ui/react';
import { useRosterState } from 'amazon-chime-sdk-component-library-react';
import { useFullscreenContext } from 'jexity-app/context/Fullscreen';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useAuthStore } from 'src/modules/auth/authStore';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import { ParticipantBox } from './ParticipantBox';

export const ConferenceMembers: FC = () => {
  const router = useRouter();
  const meetingId = typeof router.query.id === 'string' ? router.query.id : undefined;
  const { roster } = useRosterState();
  const { fullscreen } = useFullscreenContext();

  const { data: activeMeeting } = useMeetingByIdQuery(meetingId, {
    enabled: false,
  });
  const activeDocumentId = activeMeeting?.activeDocumentId;
  const me = useAuthStore((state) => state.me);

  const fullscreenStyle: BoxProps = {
    pos: 'absolute',
    zIndex: 1,
    top: 5,
    right: 5,
  };

  return (
    <Flex
      minW={['141px', null, null, null, '260px']}
      flexDir={['row', null, null, 'column']}
      {...(fullscreen && fullscreenStyle)}
    >
      {Object.values(roster)
        .filter((attendee) => {
          if (activeDocumentId) {
            return true;
          } else {
            if (attendee.externalUserId === me?.sub) {
              return true;
            } else {
              return false;
            }
          }
        })
        .map((attendee, i) => {
          return <ParticipantBox key={i} attendee={attendee} />;
        })}
    </Flex>
  );
};
