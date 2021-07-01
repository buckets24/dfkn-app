import { FC } from 'react';
import { Text, Flex } from '@chakra-ui/react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';

const AgentProfilePicture: FC = () => {
  const me = useAuthStore(getMe);
  return (
    <Flex alignItems="center" justifyContent="center" flexDir="column" minH="220px">
      {/* <Image src="/placeholder-profile-picture.png" mb={4} w="120px" /> */}
      <Text fontWeight="500" mb={2}>
        {me?.firstName} {me?.lastName}
      </Text>
      <Text fontSize="xs" color="brand.secondary.300" fontWeight="bold" textTransform="uppercase" letterSpacing="1px">
        Berater
      </Text>
    </Flex>
  );
};

export default AgentProfilePicture;
