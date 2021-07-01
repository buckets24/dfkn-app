import { AspectRatio, Box, BoxProps, Button, Flex, Tag, Text } from '@chakra-ui/react';
import {
  LocalVideo,
  RemoteVideo,
  useAttendeeAudioStatus,
  useRemoteVideoTileState,
} from 'amazon-chime-sdk-component-library-react';
import { RosterAttendeeType } from 'amazon-chime-sdk-component-library-react/lib/types';
import { MicIcon } from 'jexity-app/icons/MicIcon';
import { MutedIcon } from 'jexity-app/icons/MuteIcon';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import VideoContainer from 'src/modules/video-conference/VideoContainer';
import { CrownIcon } from 'src/theme/icons/CrownIcon';
import { UserPlaceholderIcon } from 'src/theme/icons/UserPlaceholderIcon';

export interface ParticipantBox extends BoxProps {
  attendee: RosterAttendeeType;
  featured?: boolean;
}

const ellipsisStyle: BoxProps = {
  maxW: ['50px', null, null, null, '110px'],
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

export const ParticipantBox: FC<ParticipantBox> = ({ attendee, featured = false, ...boxProps }) => {
  const router = useRouter();
  const meetingId = typeof router.query.id === 'string' ? router.query.id : undefined;
  const { data } = useMeetingByIdQuery(meetingId, {
    enabled: false,
  });
  const activeMeeting = data;
  const me = useAuthStore(getMe);
  const isMe = me?.sub === attendee.externalUserId;
  const { attendeeIdToTileId } = useRemoteVideoTileState();
  const { muted } = useAttendeeAudioStatus(attendee.chimeAttendeeId);
  const isMod = activeMeeting?.owner === attendee.externalUserId;

  const participantIcons = (
    <Flex>
      {isMod && (
        <Box
          d="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.100"
          borderRadius="50%"
          w={['24px', null, null, null, '34px']}
          h={['24px', null, null, null, '34px']}
          zIndex={1}
          mr={2}
        >
          <CrownIcon w={['9px', null, null, null, '18px']} h="auto" />
        </Box>
      )}
      <Button
        d="flex"
        justifyContent="center"
        alignItems="center"
        w={['24px', null, null, null, '32px']}
        h={['24px', null, null, null, '32px']}
        minW="none"
        px={[0, null, null, null, 4]}
        borderRadius="50%"
        bg={muted ? 'support.alert.600' : 'gray.100'}
        // TODO Support mod muting. For now it requries work
        pointerEvents="none"
      >
        {muted ? (
          <MutedIcon width={['9px', null, null, null, '11px']} height="auto" color="white" />
        ) : (
          <MicIcon width={['9px', null, null, null, '11px']} height="auto" color="black" />
        )}
      </Button>
    </Flex>
  );

  return (
    <Box
      pos="relative"
      mb="18px"
      mr={['13px', null, null, 0]}
      backgroundPosition="center"
      backgroundSize="cover"
      borderRadius="6px"
      maxW={featured ? [] : ['141px', null, null, null, '256px']}
      maxH={featured ? [] : ['80px', null, null, '100%']}
      w="100%"
      h={featured ? '100%' : 'initial'}
      overflow="hidden"
      {...boxProps}
    >
      {!featured && (
        <AspectRatio ratio={16 / 9}>
          <span></span>
        </AspectRatio>
      )}
      <Flex
        pos="absolute"
        top={0}
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100%"
        bg="brand.secondary.300"
        borderRadius="6px"
      >
        <UserPlaceholderIcon color="white" />
        <VideoContainer pos="absolute" top={0} left={0} w="100%" h={featured ? '100%' : 'initial'}>
          {isMe && <LocalVideo />}
          {attendeeIdToTileId[attendee.chimeAttendeeId] && (
            <RemoteVideo tileId={attendeeIdToTileId[attendee.chimeAttendeeId]} />
          )}
        </VideoContainer>
      </Flex>
      <Box pos="absolute" right="8px" top="8px">
        {!featured && participantIcons}
      </Box>

      <Flex pos="absolute" left={[1, null, null, null, 2]} bottom={2} textTransform="capitalize">
        {isMe ? (
          <Tag ml={[1, null, null, null, 2]} p={[1, null, null, null, 2]} bg="black" borderRadius="3px" mr={2}>
            <Text {...ellipsisStyle} fontFamily="heading" fontSize={['xs', null, null, null, 'md']} color="white">
              Ich
            </Text>
          </Tag>
        ) : (
          <Tag p={[1, null, null, null, 2]} bg="black" borderRadius="3px" mr={2}>
            <Text
              {...ellipsisStyle}
              maxW={['50px', null, null, null, '155px']}
              fontFamily="heading"
              fontSize={['xs', null, null, null, 'md']}
              color="white"
            >
              {attendee.name}
            </Text>
          </Tag>
        )}
        {featured && participantIcons}
      </Flex>
    </Box>
  );
};
