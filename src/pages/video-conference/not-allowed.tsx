import { Box, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';

const NotAllowedInMeeting: FC = () => {
  const router = useRouter();
  const meetingIdRedirect = router.query.meetingIdRedirect;
  return (
    <Box h="100vh" w="100vw" bg="brand.gradientBackground" d="flex" alignItems="center" justifyContent="center">
      <Box textAlign="center" p={12}>
        <Heading color="white">
          Sie sind nicht autorisiert am Meeting teilzunehmen{' '}
          {typeof meetingIdRedirect === 'string' && meetingIdRedirect}
        </Heading>
      </Box>
    </Box>
  );
};

export default NotAllowedInMeeting;
