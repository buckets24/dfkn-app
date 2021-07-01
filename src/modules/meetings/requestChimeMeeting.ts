import { CreateAttendeeCommandOutput, CreateMeetingCommandOutput } from '@aws-sdk/client-chime';
import { CognitoUser } from 'amazon-cognito-identity-js';
import chime from 'src/modules/video-conference/chimeInstance';

export type JoinMeetingOutput = {
  meeting: CreateMeetingCommandOutput;
  attendee: CreateAttendeeCommandOutput;
};

const requestChimeMeeting = async (
  meetingModelId: string,
  user: CognitoUser,
  mediaRegion: string
): Promise<JoinMeetingOutput | undefined> => {
  const chimeMeetingResponse = await chime.createMeeting({
    ClientRequestToken: meetingModelId,
    MediaRegion: mediaRegion,
  });

  const chimeMeetingId = chimeMeetingResponse.Meeting?.MeetingId;

  if (chimeMeetingId) {
    const chimeAttendeeResponse = await chime.createAttendee({
      MeetingId: chimeMeetingId,
      ExternalUserId: user.getUsername(),
    });

    return {
      meeting: chimeMeetingResponse,
      attendee: chimeAttendeeResponse,
    };
  }
};

export default requestChimeMeeting;
