import { FC } from 'react';
import { Text, Flex } from '@chakra-ui/react';

const AdminProfilePicture: FC = () => {
  return (
    <Flex alignItems="center" justifyContent="center" flexDir="column" minH="220px">
      {/* <Image src="/placeholder-profile-picture.png" mb={4} w="120px" /> */}
      <Text fontWeight="500" mb={2}>
        Max Mustermann
      </Text>
      <Text fontSize="xs" color="brand.secondary.300" fontWeight="bold" textTransform="uppercase" letterSpacing="1px">
        Administrator
      </Text>
    </Flex>
  );
};

// noinspection JSUnusedGlobalSymbols
export default AdminProfilePicture;
