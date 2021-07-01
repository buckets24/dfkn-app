import API from '@aws-amplify/api';
import { Box, Grid, useToast } from '@chakra-ui/react';
import { useContentShareState, useRosterState } from 'amazon-chime-sdk-component-library-react';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useDebounce } from 'jexity-app/utils/useDebounce';
import React, { FC, memo, ReactNode, useEffect, useState } from 'react';
import { NessyCloudLogo } from 'src/theme/icons/NessyCloudLogo';
import { NessyCloudWhiteLogo } from 'src/theme/icons/NessyCloudWhiteLogo';
import { VideoControls } from 'src/views/video-conference/Controls/VideoControls';
import { DocumentRenderer } from 'src/views/video-conference/DocumentRenderer';
import { ConferenceMembers } from 'src/views/video-conference/Participants/ConferenceMembers';
import { ParticipantBox } from 'src/views/video-conference/Participants/ParticipantBox';
import ScreenShareRenderer from 'src/views/video-conference/ScreenShareRenderer';
import { WelcomeScreen } from 'src/views/video-conference/WelcomeScreen';
import { useFullscreenContext } from '../../../jexity-app/context/Fullscreen';
import { getMe, useAuthStore } from '../auth/authStore';
import { documentScrollPosToastUpdateErr } from '../documents/documentMsg';
import useDocumentByIdQuery from '../documents/query-hooks/useDocumentByIdQuery';
import { putActiveDocumentId, updateScrollPositionPercent } from '../meetings/meetingsService';
import useMeetingByIdQuery from '../meetings/query-hooks/useMeetingByIdQuery';

export interface VideoConferenceContentProps {
  activeMeetingId: string;
  activeDocumentId: string | null | undefined;
}
const VideoConferenceContent: FC<VideoConferenceContentProps> = memo(({ activeDocumentId, activeMeetingId }) => {
  const toast = useToast();
  const { fullscreen } = useFullscreenContext();
  const activeDocument = useDocumentByIdQuery(activeDocumentId, { enabled: false });
  const { sharingAttendeeId, paused } = useContentShareState();
  const { roster } = useRosterState();
  const me = useAuthStore(getMe);

  const activeMeetingQuery = useMeetingByIdQuery(activeMeetingId, { enabled: false });
  const activeMeeting = activeMeetingQuery.data;

  const [scrollPosPercent, setScrollPosPercent] = useState<number>(0);
  const debouncedScrollPos = useDebounce(scrollPosPercent, 200);

  useEffect(() => {
    if (activeMeeting?.id && activeMeeting.moderatorId === me?.id) {
      updateScrollPositionPercent(activeMeeting.id, debouncedScrollPos, API).catch((e) => {
        const errorCode = log(LogLevel.error, e, { label: 'DocumentRendererUpdateScrollPosition', ...e });
        toast(documentScrollPosToastUpdateErr(errorCode));
      });
    }
  }, [debouncedScrollPos, activeMeeting?.id, activeMeeting?.moderatorId, me?.id, toast]);

  const attendees = Object.values(roster);
  const moderatorAsAttendee = attendees.find((a) => a.externalUserId === activeMeeting?.owner);

  const clientAsAttendee = attendees.find((a) => a.externalUserId === activeMeeting?.client.sub);

  const meIsOwner = me?.sub === activeMeeting?.owner;

  let output: ReactNode = <WelcomeScreen />;
  const renderedAttendee = meIsOwner ? clientAsAttendee : moderatorAsAttendee;
  if (!paused && sharingAttendeeId) {
    output = <ScreenShareRenderer />;
  } else if (renderedAttendee && !activeDocument.data) {
    output = <ParticipantBox attendee={renderedAttendee} featured />;
  } else if (activeDocument.data) {
    const isMod = activeMeeting?.moderatorId === me?.id;
    output = (
      <DocumentRenderer
        activeDocumentId={activeDocument.data.id}
        autoScroll={!isMod}
        scrollPosPercent={activeMeeting?.scrollPosPercent ?? 0}
        onDocumentScroll={(scrollPos, scrollPosPercent) => {
          if (isMod) {
            setScrollPosPercent(scrollPosPercent);
          }
        }}
        onCloseDocument={
          activeMeeting?.moderatorId === me?.id
            ? async () => {
                if (activeMeeting?.id) {
                  await putActiveDocumentId(activeMeeting.id, null, API);
                }
              }
            : undefined
        }
        allowedToScroll={me?.id === activeMeeting?.moderatorId}
      />
    );
  }

  return (
    <Box
      pos="relative"
      h={['calc(100vh - 60px)', null, null, null, 'calc(100vh - 90px)']}
      bg="brand.gradientBackground"
      overflow="hidden"
    >
      <Box>
        <Box px={[3, null, null, null, 10]}>
          {fullscreen ? (
            <NessyCloudLogo pos="relative" zIndex={1} d={['none', null, null, 'block']} m="1rem 1rem 1rem 0" />
          ) : (
            <NessyCloudWhiteLogo pos="relative" zIndex={1} m="1rem 1rem 1rem 0" />
          )}
        </Box>
        <Box px={[3, null, null, null, 10]}>
          <Grid
            my={2}
            mx="auto"
            templateColumns={['1fr', null, null, '1fr min-content']}
            templateRows={['1fr min-content', null, null, '1fr']}
            gap={['18px']}
            justifyContent="center"
            minH={['calc(100vh - 140px)', null, null, 'calc(100vh - 160px)', 'calc(100vh - 200px)']}
          >
            <Box
              pos="relative"
              minW={['450px', null, null, '728px', '806px', '832px']}
              {...(fullscreen
                ? {
                    pos: 'absolute',
                    top: 0,
                    left: 0,
                    w: '100%',
                    h: '100%',
                    borderRadius: 0,
                  }
                : {
                    borderWidth: '2px',
                    borderColor: 'white',
                    borderRadius: '6px',
                  })}
            >
              {output}
            </Box>
            <ConferenceMembers />
          </Grid>
        </Box>
      </Box>
      {/* Hoverable div to display/hide video controls */}
      <Box pos="fixed" w="100%" zIndex={3} bottom={0} minH={['60px', null, null, '90px']}>
        <Box zIndex={3} pos="fixed" w="100%" bottom={0} transition="all 500ms" transitionTimingFunction="ease-in-out">
          <VideoControls />
        </Box>
      </Box>
    </Box>
  );
});

export default VideoConferenceContent;
