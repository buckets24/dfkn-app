import { Box, Button, Heading, Link, useToast } from '@chakra-ui/react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import Axios from 'axios';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { PasswordFormikField } from 'jexity-app/form/fields/PasswordField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, memo } from 'react';
import 'src/AmplifyConfig';
import { IsCognitoUserInterfaceHasChallenge } from 'src/modules/auth/authApi';
import { Me, useAuthStore } from 'src/modules/auth/authStore';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import { loginFormYupSchema } from 'src/modules/common/yupSchemaFields';
import useChimeMediaRegion from 'src/modules/video-conference/useChimeMediaRegion';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { getAuthenticationLayout } from 'src/views/agents/AuthenticationLayout';
import { useContext } from 'use-context-selector';
import { ROLES } from 'src/API';
import queryClient from 'src/queryClient';

interface LoginFormValues {
  email?: string;
  password?: string;
}

const LoginFormContent: FC = memo(() => {
  const formikBag = useContext(SpecialFormikContext);

  return (
    <form onSubmit={formikBag?.handleSubmit} noValidate>
      <FormGridLayout
        columns={1}
        spacingX={5}
        spacingY={5}
        fields={[
          <EmailFormikField
            key="email"
            name="email"
            label="E-Mail-Addresse"
            isRequired={true}
            showRequiredIcon={false}
          />,
          <PasswordFormikField
            key="password"
            name="password"
            label="Passwort"
            isRequired={true}
            showRequiredIcon={false}
          />,
        ]}
      />
      <NextLink href="/forgot-password" passHref>
        <Link fontSize="sm" color="gray.700" _hover={{ textDecor: 'none', color: 'documents.tertiary.500' }}>
          Passwort vergessen
        </Link>
      </NextLink>
      <Button
        type="submit"
        isLoading={formikBag?.isSubmitting}
        mt={5}
        py={6}
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
    </form>
  );
});

const Login: FC & HasLayout = () => {
  const toast = useToast();
  const router = useRouter();
  const meetingIdRedirect = router.query.meetingIdRedirect;
  const setAuth = useAuthStore((state) => state.setAuth);
  const setCognitoUser = useAuthStore((state) => state.setCognitoUser);
  const mediaRegion = useChimeMediaRegion();

  return (
    <Box mt={8} w="100%" minW={['100%', null, null, '350px']}>
      <Heading as="h2" mb={10} fontSize="xl" fontWeight="bold" letterSpacing="-0.06px">
        Melden Sie sich bei DFK NORD an
      </Heading>

      <SpecialFormikContextProvider<LoginFormValues>
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginFormYupSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          const { email, password } = values;
          try {
            if (email && password) {
              queryClient.clear();
              const cognitoUser = await Auth.signIn(email, password);

              if (!(cognitoUser instanceof CognitoUser)) {
                throw new Error('Auth.signIn did not return a CognitoUser instance');
              }

              if (
                IsCognitoUserInterfaceHasChallenge(cognitoUser) &&
                cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED'
              ) {
                setCognitoUser(cognitoUser);
                if (meetingIdRedirect) {
                  void router.push(`/new-account?meetingIdRedirect=${meetingIdRedirect}&mediaRegion=${mediaRegion}`);
                } else {
                  void router.push('/new-account');
                }
                return;
              } else {
                setCognitoUser(cognitoUser);
              }

              if (await hasCognitoGroup(cognitoUser, ROLES.Admin)) {
                log(LogLevel.info, 'ADMIN_LOGGED_IN', { label: 'Login', message: 'Admin has logged in' });
                void router.push('/admin');
                return;
              } else {
                const cognitoUserSub = cognitoUser.getUsername(); // This seems to be equal to the sub.
                if (!cognitoUserSub) {
                  throw new Error('Cognito user has no username, which is impossible.');
                }

                const meResponse = await Axios.get<Me>('/api/me');
                const user = meResponse.data;
                setAuth(user);
                toast({
                  title: 'Login erfolgreich',
                  description: `Wilkommen ${user.firstName} ${user.lastName}`,
                  isClosable: true,
                });

                if (meetingIdRedirect) {
                  void router.push(`/video-conference/${meetingIdRedirect}?mediaRegion=${mediaRegion}`);
                } else {
                  if (user.userType === 'AGENT') {
                    log(LogLevel.info, 'AGENT_LOGGED_IN', { label: 'Login', message: 'An agent has logged in' });
                    void router.push('/agent');
                  }
                  if (user.userType === 'CLIENT') {
                    log(LogLevel.info, 'CLIENT_LOGGED_IN', { label: 'Login', message: 'A client has logged in' });
                    void router.push('/client');
                  }
                }
              }
            }
          } catch (e) {
            const errorCode = log(LogLevel.error, e, { label: 'Login', ...e });

            if (e.code === 'PasswordResetRequiredException') {
              /**
               * TODO
               * Handler redirection
               */
              void router.push(`/reset-password/${email}`);
            } else {
              toast({
                title: 'Anmeldung fehlgeschlagen',
                description: `Bitte prüfen Sie Ihre Anmeldedaten und versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
                status: 'error',
                duration: 15000,
                isClosable: true,
              });
            }
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        <LoginFormContent />
      </SpecialFormikContextProvider>
    </Box>
  );
};

Login.getLayout = getAuthenticationLayout;

export default Login;
