import { FC, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import Axios from 'axios';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import { HubCallback } from '@aws-amplify/core';
import { useRouter } from 'next/router';
import { Me, useAuthStore } from 'src/modules/auth/authStore';
import { Fade, Flex, Spinner } from '@chakra-ui/react';
import { NessyCloudLogo } from 'src/theme/icons/NessyCloudLogo';
import { gotoAdminHome, gotoAgentHome, gotoClientHome } from './routing';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { ROLES } from 'src/API';
import queryClient from 'src/queryClient';
import { CLIENTS_QUERY_KEY } from 'src/modules/client/query-hooks/clientQueryKeys';

export const Loader: FC<{ isLoading: boolean }> = ({ isLoading = false }) => {
  return (
    <Fade in={isLoading} unmountOnExit>
      <Flex flexDirection="column" justifyContent="center" alignItems="center" h="100vh" w="100%" overflow="hidden">
        <NessyCloudLogo mt={-10} minW="181px" minH="70px" />
        <Spinner mt={4} emptyColor="#5771DB" color="#63D9CC" thickness="4px" size="lg" />
      </Flex>
    </Fade>
  );
};

export const AuthGuard: FC = ({ children }) => {
  const router = useRouter();
  const setCognitoUser = useAuthStore((state) => state.setCognitoUser);
  const cognitoUser = useAuthStore((state) => state.cognitoUser);
  const setAuth = useAuthStore((state) => state.setAuth);
  const firstURLPath = router.pathname.split('/')[1];
  const [canView, setCanView] = useState(false);
  const viewableURLPaths = ['video-conference']; // Array of viewable pages for agent/client
  const publicURLPaths = ['datenschutz', 'impressum']; // Array of viewable pages for anyone

  useEffect(() => {
    const init = async () => {
      try {
        const cognitoUser = await Auth.currentAuthenticatedUser();
        setCognitoUser(cognitoUser);
      } catch (e) {
        void router.push('/login');
      }
    };
    void init();
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (cognitoUser) {
          if (await hasCognitoGroup(cognitoUser, ROLES.Admin)) {
            // redirect to the proper start page
            if (router.pathname === '/') {
              gotoAdminHome(router);
              setCanView(true);
              return;
            }

            if (firstURLPath !== 'admin' && !publicURLPaths.includes(firstURLPath)) {
              gotoAdminHome(router);
              setCanView(false);
            } else {
              setCanView(true);
            }

            return;
          } else {
            const meResponse = await Axios.get<Me>('/api/me');
            const user = meResponse.data;
            setAuth(user);

            if (user.userType === 'AGENT') {
              if (router.pathname === '/') {
                gotoAgentHome(router);
                setCanView(true);
              }
              if (
                firstURLPath === 'agent' ||
                viewableURLPaths.includes(firstURLPath) ||
                publicURLPaths.includes(firstURLPath)
              ) {
                setCanView(true);
              } else {
                gotoAgentHome(router);
                setCanView(false);
              }
            }

            if (user.userType === 'CLIENT') {
              if (router.pathname === '/') {
                gotoClientHome(router);
                setCanView(true);
              }
              if (
                firstURLPath === 'client' ||
                viewableURLPaths.includes(firstURLPath) ||
                publicURLPaths.includes(firstURLPath)
              ) {
                setCanView(true);
              } else {
                gotoClientHome(router);
                setCanView(false);
              }
            }
          }
        }
      } catch (e) {
        // If user not logged in and tried to access public urls
        // Allow them to access it
        if (publicURLPaths.includes(firstURLPath)) {
          setCanView(true);
          return;
        }

        if (router.pathname !== '/login' && router.pathname !== '/forgot-password') {
          void router.push('/login');
        }
      }
    };
    initAuth().catch((e) => {
      log(LogLevel.error, e, { label: 'AuthGuard', ...e });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, setCognitoUser, setAuth, cognitoUser]);

  useEffect(() => {
    const callback: HubCallback = (data) => {
      switch (data.payload.event) {
        case 'signIn':
          log(LogLevel.info, 'User signed in', { label: 'AuthGuard' });
          break;
        case 'signOut':
          log(LogLevel.info, 'User has signed out', { label: 'AuthGuard' });
          queryClient.clear();
          void router.push('/login');
          break;
        case 'signIn_failure':
          log(LogLevel.error, 'User sign in failed', { label: 'AuthGuard' });
          break;
        case 'tokenRefresh':
          log(LogLevel.info, 'Token refresh succeeded', { label: 'AuthGuard' });
          break;
        case 'tokenRefresh_failure':
          log(LogLevel.info, 'Token refresh failed', { label: 'AuthGuard' });
          void router.push('/login');
          break;
        case 'configured':
          log(LogLevel.info, 'The Auth module is configured', { label: 'AuthGuard' });
          break;
      }
    };
    Hub.listen('auth', callback);
    return () => Hub.remove('auth', callback);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Loader isLoading={!canView} />
      {canView && children}
    </>
  );
};
