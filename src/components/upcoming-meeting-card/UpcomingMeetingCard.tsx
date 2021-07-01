import { FC } from 'react';
import NextLink from 'next/link';
import Card from 'jexity-app/card/Card';
import { Box, Text, Link } from '@chakra-ui/react';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import formatDateToDeTime from 'jexity-app/utils/formatDateToDeTime';

export interface UpcommingMeetingProps {
  meetingId?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  appointmentDate?: Date;
}

export const UpcomingMeetingCard: FC<UpcommingMeetingProps | undefined> = ({
  meetingId,
  title,
  firstName,
  lastName,
  appointmentDate,
}) => {
  return (
    <Card px={6} py={4} maxW={['100%', null, null, '377px']} bg="brand.primary.500" borderRadius="4px" color="white">
      <Text fontWeight={700} fontSize="xs" textTransform="uppercase" letterSpacing={1}>
        Anstehende Beratung
      </Text>
      {meetingId && appointmentDate && !isNaN(appointmentDate.getTime()) ? (
        <>
          <Text fontWeight={500} fontSize="xl" lineHeight={1.4}>
            {title} {firstName} {lastName}
          </Text>
          <Text fontWeight={500} fontSize="lg">
            {formatDateToDe(appointmentDate, 'd MMMM yyyy')}
          </Text>
          <Text fontWeight={500} fontSize="lg">
            {formatDateToDeTime(appointmentDate, 'H:mm')}
          </Text>
          <Box textAlign="right">
            <NextLink href={`/agent/meetings/${meetingId}`} passHref>
              <Link
                fontWeight={700}
                fontSize="xs"
                textTransform="uppercase"
                letterSpacing={1}
                _hover={{ textDecor: 'none', color: 'brand.primary.900' }}
              >
                Zum Termin
              </Link>
            </NextLink>
          </Box>
        </>
      ) : (
        <Box>
          <Text fontWeight={500} fontSize="xl" lineHeight={1.4}>
            Keine Termine geplant
          </Text>
        </Box>
      )}
    </Card>
  );
};
