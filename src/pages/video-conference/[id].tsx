import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { useToast } from '@chakra-ui/react';
import { lightTheme, MeetingProvider } from 'amazon-chime-sdk-component-library-react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { withSSRContext } from 'aws-amplify';
import { FullScreenProvider } from 'jexity-app/context/Fullscreen';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { GetServerSideProps, Redirect } from 'next';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import 'src/AmplifyConfig';
import { ROLES } from 'src/API';
import { requestAgentBySub } from 'src/modules/agent/agentService';
import { AuthUserType } from 'src/modules/auth/authStore';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import { requestClientBySub } from 'src/modules/client/clientService';
import useClientByIdQuery from 'src/modules/client/query-hooks/useClientByIdQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import {
  documentToastRequestingDocumentErr,
  documentToastRequestingDocumentPatchesErr,
} from 'src/modules/documents/documentMsg';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import useDocumentPatchesByDocumentIdQuery from 'src/modules/documents/query-hooks/useDocumentPatchesByDocumentIdQuery';
import useDocumentsByClientIdQuery from 'src/modules/documents/query-hooks/useDocumentsByClientIdQuery';
import MeetingHandler from 'src/modules/meetings/MeetingHandler';
import { requestMeetingsByClientId } from 'src/modules/meetings/meetingsService';
import useMeetingByIdQuery from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import requestChimeMeeting, { JoinMeetingOutput } from 'src/modules/meetings/requestChimeMeeting';
import ActiveMeetingWatcher from 'src/modules/meetings/watchers/ActiveMeetingWatcher';
import VideoConferenceContent from 'src/modules/video-conference/VideoConferenceContent';
import { videoConferenceToastRequestMeetingErr } from 'src/modules/video-conference/videoConferenceMsg';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { gotoLogin } from 'src/views/common/routing';
import { ThemeProvider } from 'styled-components';

export interface VideoConferenceProps {
  stringifiedChimeResponse: string | null | undefined;
}

/**
 * Page component
 */
const VideoConference: FC<VideoConferenceProps> = ({ stringifiedChimeResponse }) => {
  const chimeResponse: JoinMeetingOutput = JSON.parse(stringifiedChimeResponse ?? '');

  const router = useRouter();
  const id = router.query.id;
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  const toast = useToast();

  const { data } = useMeetingByIdQuery(typeof id === 'string' ? id : undefined, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e, { label: 'VideoConferenceRequestMeeting', ...e });
      toast(videoConferenceToastRequestMeetingErr(errorCode));
    },
  });
  const activeMeeting = data;

  useDocumentByIdQuery(data?.activeDocumentId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useDocumentByIdQuery in Print', {
        label: 'RequestDocumentWithPatchesById',
        ...e,
      });
      toast(documentToastRequestingDocumentErr(errorCode));
    },
  });
  useDocumentPatchesByDocumentIdQuery(data?.activeDocumentId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useDocumentPatchesByDocumentIdQuery in Print', {
        label: 'RequestPatchesByDocumentId',
        ...e,
      });
      toast(documentToastRequestingDocumentPatchesErr(errorCode));
    },
  });
  useClientByIdQuery(data?.clientId, {
    refetchOnWindowFocus: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useClientByIdQuery() in VideoConference', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });
  useDocumentsByClientIdQuery(data?.clientId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useDocumentsByClientIdQuery() in VideoConference', e);
      toast(documentToastRequestingDocumentErr(errorCode));
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <MeetingProvider>
        <MeetingHandler attendee={chimeResponse.attendee} meeting={chimeResponse.meeting} />

        {activeMeeting && <ActiveMeetingWatcher meeting={activeMeeting} />}
        <FullScreenProvider
          value={{
            fullscreen,
            setFullscreen,
          }}
        >
          <AuthGuard>
            {typeof id === 'string' && (
              <VideoConferenceContent activeDocumentId={data?.activeDocumentId} activeMeetingId={id} />
            )}
          </AuthGuard>
        </FullScreenProvider>
      </MeetingProvider>
    </ThemeProvider>
  );
};

export const getServerSideProps: GetServerSideProps<VideoConferenceProps> = async (context) => {
  const { Auth, API } = withSSRContext(context);
  const { query } = context;
  const meetingId = query.id;
  const mediaRegion = query.mediaRegion as string;

  if (typeof meetingId !== 'string') {
    throw new Error('query.id is not a valid meeting id');
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
    log(LogLevel.error, e.message ?? 'requestClientBySub() or requestAgentBySub() in video-conference', e);
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

export default VideoConference;
