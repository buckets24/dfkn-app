import { Box, Link, useToast } from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { ArrowIcon } from 'src/theme/icons/ArrowIcon';
import { getAuthenticationLayout } from 'src/views/agents/AuthenticationLayout';
import { ResetPasswordForm } from 'src/views/reset-password/ResetPasswordForm';

const ResetPassword: FC & HasLayout = () => {
  const router = useRouter();
  const toast = useToast();
  const email = router.query.email;

  if (typeof email !== 'string' && process.browser) {
    void router.replace('/login');
    return null;
  }

  return (
    <Box mt={8} minW={['100%', null, '500px', '350px']}>
      {typeof email === 'string' && (
        <ResetPasswordForm
          email={email}
          onSubmit={(values, actions) => {
            const { verificationCode, password, repeatPassword } = values;
            const { setSubmitting } = actions;
            if (email && password === repeatPassword) {
              /**
               * IMPORTANT NOTE:
               * Cognito considers forgotPassword and resetPassword the same, the code
               * sent to the client is usable for both operations.
               *
               * I'm not sure if this was actually intended by Cognito, but it is a easier
               * way compared to setting up Endpoints and handlers that in turn could throw
               * more errors
               */
              Auth.forgotPasswordSubmit(email, verificationCode, password)
                .then(() => {
                  setSubmitting(false);
                  log(LogLevel.info, 'RESET_PASSWORD_SUBMIT', {
                    label: 'ForgotPasswordForm',
                    message: `The user's password was successfully reset`,
                  });
                  toast({
                    title: 'Passwort geändert',
                    description: 'Ihr Passwort wurde erfolgreich geändert!',
                    status: 'success',
                    isClosable: true,
                  });
                  void router.push('/login');

                  void axios.patch(`/api/cognito/sync-cognito-status/${email}`);
                })
                .catch((e) => {
                  if (e.__type === 'ExpiredCodeException') {
                    const errorCode = log(LogLevel.error, 'ExpiredCodeException', {
                      label: 'ForgotPassword',
                      ...e,
                    });
                    toast({
                      title: 'Bestätigungscode abgelaufen',
                      description: `Ihr Bestätigungscode ist abgelaufen. Bitte fordern Sie einen neuen Bestätigungscode an. (Fehlercode: ${errorCode})`,
                      status: 'error',
                      duration: 15000,
                      isClosable: true,
                    });
                  } else if (e.code === 'CodeMismatchException') {
                    const errorCode = log(LogLevel.error, 'CodeMismatchException', {
                      label: 'ForgotPassword',
                      ...e,
                    });
                    toast({
                      title: 'Falscher Bestätigungscode',
                      description: `Bitte überprüfen Sie Ihren Bestätigungscode und versuchen es erneut. (Fehlercode: ${errorCode})`,
                      status: 'error',
                      duration: 15000,
                      isClosable: true,
                    });
                  } else if (e.code === 'LimitExceededException') {
                    const errorCode = log(LogLevel.error, 'LimitExceededException', {
                      label: 'ForgotPassword',
                      ...e,
                    });
                    toast({
                      title: 'Fehler',
                      description: `Maximale Versuchsanzahl überschritten, bitte versuchen Sie es nach einiger Zeit erneut. (Fehlercode: ${errorCode})`,
                      status: 'error',
                      duration: 15000,
                      isClosable: true,
                    });
                  } else {
                    const errorCode = log(LogLevel.error, e, { label: 'ForgotPassword', ...e });
                    toast({
                      title: 'Fehler',
                      description: `Beim Festlegen Ihres Passworts ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
                      status: 'error',
                      duration: 15000,
                      isClosable: true,
                    });
                  }
                  setSubmitting(false);
                });
            }
          }}
        />
      )}
      <NextLink href="/login" passHref>
        <Link
          pos="absolute"
          bottom={[5, null, null, 10]}
          d="flex"
          alignItems="center"
          fontSize="sm"
          color="gray.700"
          _hover={{ textDecor: 'none', color: 'documents.tertiary.500' }}
        >
          <ArrowIcon direction="left" mr={1} /> Zurück zum Login
        </Link>
      </NextLink>
    </Box>
  );
};

ResetPassword.getLayout = getAuthenticationLayout;

export default ResetPassword;
