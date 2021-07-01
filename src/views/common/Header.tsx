import { Avatar, Box, Button, Flex, Link, SimpleGrid, SimpleGridProps, useToast } from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import { useSidebarStore } from 'jexity-app/layout/sidebar/sidebarStore';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { getCognitoUser, getMe, useAuthStore } from 'src/modules/auth/authStore';
import { DashboardIcon } from 'src/theme/icons/DashboardIcon';
import { LogoutIcon } from 'src/theme/icons/LogoutIcon';
import { NessyCloudWhiteLogo } from 'src/theme/icons/NessyCloudWhiteLogo';
import { NotificationIcon } from 'src/theme/icons/NotificationIcon';
import { Url } from 'url';

interface HeaderProps extends SimpleGridProps {
  // Flag to indicate header to use the cognito user value as a reference in
  // identifying user login state
  useCognitoUser?: boolean;
}

const Header: FC<HeaderProps> = ({ useCognitoUser = false, ...others }) => {
  const me = useAuthStore(getMe);
  const cognitoUser = useAuthStore(getCognitoUser);
  const { toggleSidebar, setToggleSidebar } = useSidebarStore();
  const router = useRouter();
  const toast = useToast();
  const logout = useAuthStore((state) => state.logout);

  const homeHref = (): string => {
    if (me?.userType === 'AGENT') {
      return '/agent';
    }

    if (me?.userType === 'CLIENT') {
      return '/client';
    }

    return '/';
  };

  const profileHref = (): string => {
    if (me?.userType === 'AGENT') {
      return '/agent/profile';
    }

    if (me?.userType === 'CLIENT') {
      return '/client/profile';
    }

    return '/';
  };

  return (
    <SimpleGrid
      pos="relative"
      templateColumns="1fr max-content min-content min-content"
      alignItems="center"
      bg="brand.primary.500"
      h="100%"
      w="100%"
      px={6}
      {...others}
    >
      <SimpleGrid templateColumns="1fr 1fr">
        <Box display={['block', null, null, null, 'none']}>
          <Button
            p={0}
            variant="ghost"
            _hover={{
              bg: 'brand.primary.900',
            }}
          >
            <DashboardIcon color="white" onClick={() => setToggleSidebar(!toggleSidebar)} />
          </Button>
        </Box>
        <Box pos={['relative', null, 'absolute', 'relative']} left="50%" transform="translateX(-50%)">
          <NextLink href={homeHref()} passHref>
            <Link>
              <NessyCloudWhiteLogo />
            </Link>
          </NextLink>
        </Box>
      </SimpleGrid>
      {useCognitoUser && !cognitoUser && !me ? (
        <Box mr={[null, null, 2, 5]}>
          <NextLink href="/login" passHref>
            <Button
              w="100%"
              bg="brand.primary.500"
              borderRadius="4px"
              color="white"
              fontSize="md"
              fontWeight="normal"
              _hover={{ bg: 'brand.primary.900' }}
            >
              Login
            </Button>
          </NextLink>
        </Box>
      ) : (
        <>
          <Box mr={[null, null, 2, 5]}>
            {/* <Popover placement="bottom-end">
              <PopoverTrigger> */}
            {(me?.userType === 'AGENT' || me?.userType === 'CLIENT') && (
              /**
               * TODO: If the client now has his/her own profile page
               * change it to href={`/${me?.userType.toLowerCase()}/profile`}
               */

              <Flex alignItems="center" color="white" fontFamily="heading" fontWeight="bold" fontSize="lg">
                {/* A placeholder image for the authenticated user's profile picture */}
                <Avatar
                  size="sm"
                  name={`${me.firstName} ${me.lastName}`}
                  mr={[null, null, null, 2]}
                  bg="brand.primary.900"
                  color="white"
                />
                <NextLink href={profileHref()} passHref>
                  <Link d={['none', null, null, 'block']} _hover={{ color: 'brand.primary.900', textDecor: 'none' }}>
                    {me.firstName} {me.lastName}
                  </Link>
                </NextLink>
                {/* <ChevronIcon direction="bottom" ml={2} w="18px" h="10.5px" /> */}
              </Flex>
            )}
            {/* </PopoverTrigger>
              <Portal>
                <PopoverContent w="172px" border="none">
                  <PopoverBody
                    px={10}
                    py={5}
                    bg="brand.primary.900"
                    borderRadius="4px"
                    color="white"
                    fontFamily="heading"
                    fontWeight="bold"
                    fontSize="lg"
                    textAlign="right"
                  >
                    <Box mb={3}>Link 1</Box>
                    <Box>Link 2</Box>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </Popover> */}
          </Box>
          <Button
            p={0}
            mr={[null, null, 3]}
            variant="ghost"
            _hover={{
              bg: 'brand.primary.900',
            }}
          >
            <NotificationIcon />
          </Button>
          <NextLink href="/login" passHref>
            <Button
              p={0}
              variant="ghost"
              _hover={{
                bg: 'brand.primary.900',
              }}
              onClick={async () => {
                await Auth.signOut();
                logout();
                toast({
                  status: 'success',
                  title: 'Logout',
                  description: 'Sie wurden erfolgreich abgemeldet.',
                  isClosable: true,
                });

                void router.push('/login');
              }}
            >
              <LogoutIcon />
            </Button>
          </NextLink>
        </>
      )}
    </SimpleGrid>
  );
};

export default Header;
