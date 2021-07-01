import { Box, Button, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import {
  ContentShare,
  useContentShareControls,
  useContentShareState,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react';
import { RosterAttendeeType } from 'amazon-chime-sdk-component-library-react/lib/types';
import { ShareArrowIcon } from 'jexity-app/icons/ShareArrowIcon';
import React, { FC } from 'react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { ScreenShareIcon } from 'src/theme/icons/ScreenShareIcon';

const ScreenShareRenderer: FC = () => {
  const { sharingAttendeeId } = useContentShareState();
  const { toggleContentShare } = useContentShareControls();
  const { roster } = useRosterState();
  const me = useAuthStore(getMe);

  let attendee: RosterAttendeeType | undefined;
  if (sharingAttendeeId) {
    /**
     * Undocumented issue
     * It seems like the sharingAttendeeId from useContentShareState
     * contains a suffix
     */
    const attendeeId = sharingAttendeeId.replace('#content', '');

    attendee = roster[attendeeId];
  }

  const meetingHasShare = !!sharingAttendeeId; // Is someone sharing
  const userIsSharing = attendee?.externalUserId === me?.sub; // Is the current authenticated user sharing

  return (
    <Box pos="relative" h="100%" w="100%" textAlign="center" bg="white">
      {meetingHasShare && !userIsSharing && (
        <SimpleGrid
          d="inline-grid"
          verticalAlign="top"
          gridTemplateColumns="1fr min-content"
          color="white"
          pos="relative"
          zIndex="1"
          overflow="hidden"
          borderBottomLeftRadius="8px"
          borderBottomRightRadius="8px"
        >
          <Flex alignItems="center" px={6} backgroundColor="support.success.500" lineHeight="24px" fontSize="md">
            <ShareArrowIcon h="28px" w="auto" mr={1} /> <span>{`${attendee?.name} präsentiert`}</span>
          </Flex>
        </SimpleGrid>
      )}
      {userIsSharing ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          pos="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="gray.800"
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDir="column"
            p={5}
            minW="436px"
            minH="240px"
            bg="gray.900"
            borderRadius="6px"
            color="white"
          >
            <ScreenShareIcon mb={5} />
            <Text mb={5} fontSize="xl" fontWeight={500}>
              Sie präsentieren für alle
            </Text>
            <Button
              maxW="230px"
              bg="brand.primary.500"
              color="white"
              borderRadius="4px"
              fontFamily="body"
              fontWeight={500}
              letterSpacing="1.25px"
              _hover={{
                bg: 'brand.primary.900',
              }}
              onClick={toggleContentShare}
            >
              Präsentation beenden
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Box pos="absolute" top="0" left="0" w="100%" h="100%">
          <ContentShare />
        </Box>
      )}
    </Box>
  );
};

export default ScreenShareRenderer;
