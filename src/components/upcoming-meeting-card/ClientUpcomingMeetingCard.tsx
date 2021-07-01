import { Box, Link, Text } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import NextLink from 'next/link';
import React, { FC, useEffect } from 'react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { requestUpcomingMeetings } from 'src/modules/meetings/meetingsService';
import useMeetingsByOwnerInfiniteQuery from 'src/modules/meetings/query-hooks/useMeetingsByOwnerInfiniteQuery';
import useChimeMediaRegion from 'src/modules/video-conference/useChimeMediaRegion';

export const ClientUpcomingMeetingCard: FC = () => {
  const me = useAuthStore(getMe);
  const meetingList = useMeetingsByOwnerInfiniteQuery(me?.owner);
  const upcomingMeetings = requestUpcomingMeetings(meetingList);
  const mediaRegion = useChimeMediaRegion();

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
    <Card d="flex" flexDir="column" justifyContent="center" px={6} py={4} minH="152px" bg="brand.primary.900">
      <Text mb={2} color="white" fontWeight={700} fontSize="xs" textTransform="uppercase" letterSpacing={1}>
        Anstehendes Meeting
      </Text>
      {upcomingMeetings && upcomingMeetings.length > 0 ? (
        <Text mb={4} color="#63D9CC" fontWeight="bold" fontSize="xl" fontFamily="heading" lineHeight="25px">
          {formatDateToDe(upcomingMeetings[0].meetingDateTime, 'd MMMM yyyy')} <br />
          {formatDateToDe(upcomingMeetings[0].meetingDateTime, 'H:mm')} Uhr
        </Text>
      ) : (
        <Text mb={3} color="white" fontWeight={500} fontSize="xl" lineHeight={1.4}>
          Keine Termine geplant
        </Text>
      )}
      {upcomingMeetings && upcomingMeetings.length > 0 && (
        <Box>
          <NextLink href={`/video-conference/${upcomingMeetings[0].id}?mediaRegion=${mediaRegion}`} passHref>
            <Link
              color="white"
              fontWeight={700}
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing={1}
              _hover={{ color: 'brand.primary.500', cursor: 'pointer' }}
            >
              AM MEETING Teilnehmen
            </Link>
          </NextLink>
        </Box>
      )}
    </Card>
  );
};
