import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { Box, Button, Link, ScaleFade, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import { lightTheme, MeetingProvider } from 'amazon-chime-sdk-component-library-react';
import { SelectedDeviceId } from 'amazon-chime-sdk-component-library-react/lib/types';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { withSSRContext } from 'aws-amplify';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { GetServerSideProps, Redirect } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { ROLES } from 'src/API';
import { requestAgentBySub } from 'src/modules/agent/agentService';
import AudioSettings from 'src/modules/audio-video-devices/AudioSettings';
import VideoSettings from 'src/modules/audio-video-devices/VideoSettings';
import { AuthUserType, getMe, useAuthStore } from 'src/modules/auth/authStore';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import { requestClientBySub } from 'src/modules/client/clientService';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import MeetingHandler from 'src/modules/meetings/MeetingHandler';
import { meetingToastLoadingUnknownErr } from 'src/modules/meetings/meetingsMsg';
import { requestMeetingsByClientId } from 'src/modules/meetings/meetingsService';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import requestChimeMeeting, { JoinMeetingOutput } from 'src/modules/meetings/requestChimeMeeting';
import { gotoLogin } from 'src/views/common/routing';
import { getSiteLayout } from 'src/views/video-conference/SiteLayout';
import { ThemeProvider } from 'styled-components';
import { VideoConferenceProps } from '../[id]';

/**
 * DELETE THIS PAGE
 * @deprecated
 */
const Settings: FC<VideoConferenceProps> & HasLayout = ({ stringifiedChimeResponse }) => {
  const chimeResponse: JoinMeetingOutput = JSON.parse(stringifiedChimeResponse ?? '');
  const me = useAuthStore(getMe);
  const [audioInput, setAudioInput] = useState<SelectedDeviceId>(null);
  const [audioOutput, setAudioOutput] = useState<SelectedDeviceId>(null);
  const router = useRouter();
  const meetingId = router.query.id;
  const toast = useToast();
  if (typeof meetingId !== 'string') {
    throw new Error(`Can't render Settings since meetingId is not a string`);
  }
  const { data: activeMeeting } = useMeetingByIdQuery(meetingId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useMeetingByIdQuery() in VideoConference Settings', e);
      toast(meetingToastLoadingUnknownErr(errorCode));
    },
  });

  useClientByIdQuery(activeMeeting?.clientId, {
    refetchOnWindowFocus: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useClientByIdQuery() in VideoConference Settings', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <MeetingProvider>
        <MeetingHandler attendee={chimeResponse.attendee} meeting={chimeResponse.meeting} />
        <Box maxW="1200px" w="100%">
          <Text color="brand.primary.900" fontFamily="heading" fontWeight="bold" lineHeight="shorter" mb={2}>
            Hallo {me?.firstName},
            <br />
            willkommen zu DFK Nord Online-Beratung!
          </Text>
          <Text fontSize="lg">Lass uns zuerst deine Geräte für das Online-Meeting einrichten.</Text>
          <Box w="100%" m="auto">
            <SimpleGrid gridTemplateColumns={['1fr', null, '1fr 1fr']} mt={10} py={6} gap={6}>
              <AudioSettings setAudioInput={setAudioInput} setAudioOutput={setAudioOutput} />
              <VideoSettings />
            </SimpleGrid>
          </Box>
          <ScaleFade initialScale={0.9} in={!!audioInput && !!audioOutput}>
            <NextLink href={`/video-conference/${meetingId}`} passHref>
              <Link _hover={{ textDecor: 'none' }}>
                <Button
                  p={6}
                  minW="50%"
                  bg="brand.primary.500"
                  borderRadius="4px"
                  color="white"
                  fontWeight={500}
                  fontSize="sm"
                  textTransform="uppercase"
                  _hover={{ bg: 'brand.primary.900' }}
                >
                  Jetzt Teilnehmen
                </Button>
              </Link>
            </NextLink>
          </ScaleFade>
        </Box>
      </MeetingProvider>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<VideoConferenceProps> = async (context) => {
  const { Auth, API } = withSSRContext(context);
  const { query } = context;
  const meetingId = query.id;
  const mediaRegion = query.mediaRegion;

  if (typeof meetingId !== 'string') {
    throw new Error('query.id is not a valid meeting id');
  }

  if (typeof mediaRegion !== 'string') {
    throw new Error('query.mediaRegion is not a valid meeting id');
  }

  if (!(Auth instanceof AuthClass)) {
    throw new Error('Auth object returned from withSSRContext is not an AuthClass');
  }

  let redirect: Redirect | undefined = undefined;
  let chimeResponses: JoinMeetingOutput | null = null;
  /**
   * TODO Should also check if the user in the first place is allowed in this meeting
   */

  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();

    if (!(cognitoUser instanceof CognitoUser)) {
      throw new Error('Unknown cognitoUser');
    }

    let user: AuthUserType | undefined = undefined;

    if (await hasCognitoGroup(cognitoUser, ROLES.Client)) {
      user = await requestClientBySub(cognitoUser.getUsername(), API);
      if (user?.sub) {
        const meetings = await requestMeetingsByClientId(user.id, API);
        const meetingIds = meetings?.map((m) => m?.id);
        if (!meetingIds?.includes(meetingId)) {
          redirect = {
            destination: `/video-conference/not-allowed?meetingIdRedirect=${meetingId}`,
            statusCode: 302,
          };
        }
      }
    } else {
      user = await requestAgentBySub(cognitoUser.getUsername(), API);
      /**
       * TODO
       * Redirect if agent is a not a guest. right now all agents can join
       */
    }

    chimeResponses = (await requestChimeMeeting(meetingId, cognitoUser, mediaRegion)) ?? null;
  } catch (e) {
    log(LogLevel.error, e.message ?? 'requestClientBySub() or requestAgentBySub() in video-conference settings', e);
    // eslint-disable-next-line no-console
    console.log('No or not authenticated user, redirecting visitor to login page');
    redirect = {
      destination: `/login?meetingIdRedirect=${meetingId}`,
      statusCode: 302,
    };
  }

  /**
   * Need to manually stringify since the chime response has `undefined` but is
   * unserializable, so we swap out undefined with null. It is also JSON.parsed
   * by the component
   */
  const stringifiedChimeResponse = JSON.stringify(chimeResponses, function (k, v) {
    return v === undefined ? null : v;
  });

  return {
    redirect,
    props: {
      stringifiedChimeResponse,
    },
  };
};

Settings.getLayout = getSiteLayout;

export default Settings;
