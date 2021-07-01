import { withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import { authAgentMiddleware } from 'src/modules/auth/authMiddleware';
import handler from 'next-connect';
import requestChimeMeeting, { JoinMeetingOutput } from 'src/modules/meetings/requestChimeMeeting';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { requestAgentBySub } from 'src/modules/agent/agentService';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import { requestClientBySub } from 'src/modules/client/clientService';
import 'src/AmplifyConfig';
import { requestMeetingsByClientId } from 'src/modules/meetings/meetingsService';
import { AuthUserType } from 'src/modules/auth/authStore';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { ROLES } from 'src/API';

export default handler<NextApiRequest, NextApiResponse<JoinMeetingOutput | SimpleError>>()
  .use(authAgentMiddleware)
  .post(
    async (req, res): Promise<void> => {
      const { API, Auth } = withSSRContext({ req });
      const { query } = req;
      const meetingId = query.meetingId;

      try {
        if (typeof meetingId !== 'string') {
          const errorCode = log(LogLevel.error, 'MALFORMED_MEETING_ID', {
            label: 'MeetingJoinEndpoint',
            message: `The passed meetingId in join-meeting endpoint is not a string ${meetingId}`,
          });
          res.status(500).json({
            type: 'MALFORMED_MEETING_ID',
            message: `The passed meetingId in join-meeting endpoint is not a string ${meetingId}`,
            errorCode,
          });
          return;
        }

        let user: AuthUserType | undefined = undefined;
        const cognitoUser = await Auth.currentAuthenticatedUser();

        if (await hasCognitoGroup(cognitoUser, ROLES.Client)) {
          user = await requestClientBySub(cognitoUser.getUsername(), API);
          if (user?.sub) {
            const meetings = await requestMeetingsByClientId(user.id, API);
            const meetingIds = meetings?.map((m) => m?.id);
            if (!meetingIds?.includes(meetingId)) {
              const errorCode = log(LogLevel.error, 'UNAUTHORIZED_TO_JOIN_MEETING', {
                label: 'MeetingJoinEndpoint',
                message: 'Unauthorized to join this meeting',
              });
              res.status(401).json({
                type: 'UNAUTHORIZED_TO_JOIN_MEETING',
                message: 'Unauthorized to join this meeting',
                errorCode,
              });
              return;
            }
          }
        } else {
          user = await requestAgentBySub(cognitoUser.getUsername(), API);
          /**
           * TODO
           * Redirect if agent is a not a guest. right now all agents can join
           */
        }

        const chimeMeeting = await requestChimeMeeting('test-meeting-id', cognitoUser, 'ap-southeast-1');
        if (chimeMeeting) {
          res.status(200).json(chimeMeeting);
          return;
        } else {
          const errorCode = log(LogLevel.error, 'CHIME_MEETING_NOT_FOUND', {
            label: 'MeetingJoinEndpoint',
            message: 'For some reason we cannot find the chime meeting',
          });
          res.status(404).json({
            type: 'CHIME_MEETING_NOT_FOUND',
            message: 'For some reason we cannot find the chime meeting',
            errorCode,
          });
        }
      } catch (e) {
        const errorCode = log(LogLevel.error, 'UNKNOWN_ERROR', {
          label: 'MeetingJoinEndpoint',
          ...e,
        });
        res.status(500).json({
          type: 'UNKNOWN_ERROR',
          message: `Error joining the meeting`,
          errorCode,
        });
      }
    }
  );
