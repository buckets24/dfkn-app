import { useToast } from '@chakra-ui/react';
import { Box, Button, Heading } from '@chakra-ui/react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { ROLES } from 'src/API';
// import { wipeDatabase } from 'src/modules/admin/scripts/wipe-database/wipeDatabase';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';

export const Wipe: FC = () => {
  const toast = useToast();
  const router = useRouter();

  Auth.currentAuthenticatedUser()
    .then(async (u) => {
      if (u instanceof CognitoUser) {
        if (!(await hasCognitoGroup(u, ROLES.Admin))) {
          void router.push('/login');
        }
      }
    })
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.log(e);
    });

  return (
    <Box mt={10} textAlign="center">
      <Heading mb={10}>WARNING: This page will delete everything</Heading>
      <Button
        size="lg"
        colorScheme="red"
        onClick={async () => {
          // await wipeDatabase();
          toast({
            title: 'We have deleted everything',
            description: 'Everything is gone',
            status: 'error',
            duration: 15000,
            isClosable: true,
          });
        }}
      >
        Delete everything
      </Button>
    </Box>
  );
};

export default Wipe;
