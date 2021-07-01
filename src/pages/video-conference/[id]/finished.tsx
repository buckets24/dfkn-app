import { FC } from 'react';
import Link from 'next/link';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { NessyCloudWhiteLogo } from 'src/theme/icons/NessyCloudWhiteLogo';
import { AuthGuard } from 'src/views/common/AuthGuard';
import { useRouter } from 'next/router';
import { FooterLayout } from 'jexity-app/layout/FooterLayout';
import Header from 'src/views/common/Header';

const VideoConferenceFinished: FC = () => {
  const me = useAuthStore(getMe);
  const router = useRouter();
  const meetingId = router.query.id;

  const handleRejoinMeeting = () => {
    /**
     * TODO: Add meetingManager.join()
     * For now it redirects to the video-conference base on the meetingId
     */
    void router.push(`/video-conference/${meetingId}`);
  };

  return (
    <AuthGuard>
      <Flex
        pos="relative"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        minH="100%"
        w="100%"
        bg="brand.gradientBackground"
      >
        <Box w="100%" h="64px">
          <Header bg="transparent" />
        </Box>
        <Box my={[3, null, null, 12]} px={[3, null, null, 10]} w="100%" h="100%">
          <Box m="auto" p={8} maxW={['100%', null, '463px']} bg="white" borderRadius="6px">
            <Heading mb={5} fontFamily="body" fontSize="4xl" fontWeight="normal" color="documents.secondary.900">
              Vielen Dank {me?.salutation} {me?.title ?? ''} {me?.firstName} {me?.lastName}, <br />
              für Ihr Vertrauen in die DFK Nord AG.
            </Heading>
            <Text color="black" fontSize="lg" fontWeight="normal" maxW="350px">
              Das Meeting wurde beendet. Sie können jetzt die Seite schließen, sich auf der DFK Nord Homepage umschauen.
              Sollten Sie das Meeting versehentlich verlassen haben, haben Sie die Möglichkeit über den nachfolgenden
              Link das Meeting erneut zu betreten.
            </Text>
            <Stack direction="column" spacing={4} alignItems="center" mt={10}>
              <Link href="https://dfknord.de/">
                <Button
                  w="306px"
                  bg="brand.primary.500"
                  color="white"
                  borderRadius="4px"
                  fontFamily="body"
                  fontWeight="normal"
                  letterSpacing="1.25px"
                  _hover={{
                    bg: 'brand.primary.900',
                  }}
                >
                  ZUR DFK NORD HOMEPAGE
                </Button>
              </Link>
              <Button
                w="306px"
                bg="support.success.600"
                color="white"
                borderRadius="4px"
                fontFamily="body"
                fontWeight="normal"
                letterSpacing="1.25px"
                _hover={{
                  bg: 'support.success.500',
                }}
                onClick={handleRejoinMeeting}
              >
                ZURÜCK ZUM MEETING
              </Button>
            </Stack>
          </Box>
        </Box>
        <FooterLayout
          color="white"
          px={[10, null, null, null, 0]}
          maxW={['100%', null, null, '1110px']}
          w="100%"
          mx="auto"
          mb={6}
        />
      </Flex>
    </AuthGuard>
  );
};

export default VideoConferenceFinished;
