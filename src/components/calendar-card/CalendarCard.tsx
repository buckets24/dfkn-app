import { FC } from 'react';
import { Box, Divider, Link, Text } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { Calendar } from 'jexity-app/calendar/Calendar';
import { getDate } from 'date-fns';
import NextLink from 'next/link';
import { TriangleIcon } from 'jexity-app/icons/TriangleIcon';

export interface CalendarCardProps {
  meetings: Date[] | undefined;
}

export const CalendarCard: FC<CalendarCardProps> = ({ meetings }) => {
  // Convert date to meetings to easily compare it on calendar date
  const convertedMeetingDates = meetings?.map((meeting) => new Date(meeting.setHours(0, 0, 0, 0)).getTime());

  const renderDayWithMeeting = (_: number, date: Date) => {
    return (
      <Box pos="relative">
        {getDate(date)}
        {convertedMeetingDates?.includes(date.getTime()) && (
          <Box
            pos="absolute"
            mt={-2}
            left="50%"
            right="50%"
            w="4px"
            h="4px"
            bg={new Date(new Date().setHours(0, 0, 0, 0)).getTime() === date.getTime() ? 'white' : 'brand.primary.500'}
            borderRadius="50%"
            transform="translate(-50%, -50%)"
          />
        )}
      </Box>
    );
  };

  const handleChange = () => {
    return;
  };

  return (
    <Card mt={5} maxW="377px">
      <Box px={6} py={4}>
        <Text mb={2} fontWeight={500} fontSize="md" color="gray.800">
          Terminübersicht
        </Text>
        <Text fontWeight={400} fontSize="xs" color="gray.700">
          {meetings?.length} gesamt
        </Text>
      </Box>
      <Divider borderColor="#E4E7EB" />
      <Box px={6} py={4}>
        <Calendar
          onChange={handleChange}
          inline
          renderDayContents={renderDayWithMeeting}
          minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
          disableDaySelection
        />
      </Box>
      <Divider borderColor="#E4E7EB" />
      <Box px={6} py={3} textAlign="right">
        <NextLink passHref href="/agent/meetings">
          <Link
            color="documents.primary.500"
            fontSize="sm"
            fontWeight={500}
            _hover={{
              textDecor: 'none',
              color: 'documents.primary.400',
            }}
          >
            Alle Termine anzeigen
            <TriangleIcon ml={2} mb={1} direction="right" />
          </Link>
        </NextLink>
      </Box>
    </Card>
  );
};
