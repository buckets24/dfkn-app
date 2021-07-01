import { Box, Grid } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { FC, useEffect } from 'react';
import { CalendarCard } from 'src/components/calendar-card/CalendarCard';
import { UpcomingMeetingCard } from 'src/components/upcoming-meeting-card/UpcomingMeetingCard';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { requestUpcomingMeetings } from 'src/modules/meetings/meetingsService';
import useMeetingsByOwnerInfiniteQuery from 'src/modules/meetings/query-hooks/useMeetingsByOwnerInfiniteQuery';
import { getAgentDashboardLayout } from 'src/views/agents/AgentDashboardLayout';

const Dashboard: FC & HasLayout = () => {
  const me = useAuthStore(getMe);
  const meetingList = useMeetingsByOwnerInfiniteQuery(me?.sub);
  const upcomingMeetings = requestUpcomingMeetings(meetingList);
  let upcomingMeeting;

  if (upcomingMeetings && upcomingMeetings.length > 0) {
    const { id, client, meetingDateTime } = upcomingMeetings[0];
    upcomingMeeting = {
      meetingId: id ? id : '',
      title: client.title ? client.title : '',
      firstName: client.firstName,
      lastName: client.lastName,
      appointmentDate: new Date(meetingDateTime),
    };
  }

  useEffect(() => {
    if (meetingList.hasNextPage) {
      void meetingList.fetchNextPage();
    }
    /**
     * Make sure to only fire this on auth initialized and once
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.sub, meetingList.fetchNextPage, meetingList.hasNextPage]);

  return (
    <>
      <Card px={6} py={4} bg="blue.100">
        Monatsergebnis
      </Card>
      <Card px={6} py={4} bg="blue.100">
        Meine Performance
      </Card>
      <Card px={6} py={4} bg="blue.100">
        Jahresziel
      </Card>
      <Card px={6} py={4} bg="blue.100">
        Jahresziel & Monatsziel
      </Card>
      <Grid templateColumns={['1fr', null, null, '1fr 1fr 1fr']} gridColumn={['1', null, null, '1/4']} gap={5}>
        <Card px={6} py={4} minH="518px" bg="blue.100" gridColumn={['1', null, null, '1/4']}>
          Anstehende Beratungen
        </Card>
        <Card px={6} py={4} minH="516px" bg="blue.100" gridColumnStart={1} gridColumn={['1', null, null, '1/3']}>
          Mitarbeiter Performance
        </Card>
        <Card px={6} py={4} bg="blue.100">
          Neue Kunden
        </Card>
      </Grid>
      <Box>
        <UpcomingMeetingCard {...upcomingMeeting} />
        <CalendarCard meetings={upcomingMeetings?.map((meeting) => new Date(meeting.meetingDateTime))} />
      </Box>
    </>
  );
};

Dashboard.getLayout = getAgentDashboardLayout;

export default Dashboard;
