import { Box } from '@chakra-ui/react';
import { RemoteVideo, useRemoteVideoTileState } from 'amazon-chime-sdk-component-library-react';
import { RosterAttendeeType } from 'amazon-chime-sdk-component-library-react/lib/types';
import React, { FC } from 'react';
import PreviewVideoModified from 'src/modules/audio-video-devices/PreviewVideoModified';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';

const FeaturedVideo: FC<{ attendee: RosterAttendeeType }> = ({ attendee }) => {
  const { attendeeIdToTileId } = useRemoteVideoTileState();
  const me = useAuthStore(getMe);
  const isMe = me?.sub === attendee.externalUserId;
  const tileId = attendeeIdToTileId[attendee.chimeAttendeeId];

  return (
    <Box w="100%" h="100%" bg="black">
      {isMe && <PreviewVideoModified />}
      {tileId && <RemoteVideo tileId={attendeeIdToTileId[attendee.chimeAttendeeId]} />}
    </Box>
  );
};

export default FeaturedVideo;
