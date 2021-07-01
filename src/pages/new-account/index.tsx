import { Box, Button, Heading, Text, useToast } from '@chakra-ui/react';
import { PasswordFormikField } from 'jexity-app/form/fields/PasswordField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import React, { FC, useState } from 'react';
import { getMe, Me, useAuthStore } from 'src/modules/auth/authStore';
import { getAuthenticationLayout } from 'src/views/agents/AuthenticationLayout';
import { API, Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { newAccountFormYupSchema } from 'src/modules/common/yupSchemaFields';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import {
  CognitoUserStatusType,
  ROLES,
  UpdateAgentModelMutation,
  UpdateAgentModelMutationVariables,
  UpdateClientModelMutation,
  UpdateClientModelMutationVariables,
} from 'src/API';
import { updateAgentModel, updateClientModel } from 'src/graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { log, LogLevel } from 'jexity-app/utils/logger';
import axios from 'axios';

const NewAccountForm: FC & HasLayout = () => {
  const toast = useToast();
  const router = useRouter();
  const cognitoUser = useAuthStore((state) => state.cognitoUser);
  const setCognitoUser = useAuthStore((state) => state.setCognitoUser);
  const setAuth = useAuthStore((state) => state.setAuth);
  const me = useAuthStore(getMe);
  const meetingIdRedirect = router.query.meetingIdRedirect;
  const mediaRegion = router.query.mediaRegion;
  const [isLoading, setIsLoading] = useState(false);

  const onNewPasswordError = (e: any) => {
    const errorCode = log(LogLevel.error, e, { label: 'NewAccount', ...e });
    setIsLoading(false);
    toast({
      title: 'Fehler',
      description: `Beim Festlegen Ihres Passworts ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
      status: 'error',
      duration: 15000,
      isClosable: true,
    });
    void router.push('/login');
  };

  return (
    <>
      <Box mt={8} minW={['100%', null, '500px', '350px']}>
        <Heading as="h2" mb={1} fontSize="xl" fontWeight="bold" letterSpacing="-0.06px">
          Hallo, {me ? `${me.firstName} ${me.lastName}` : ''}
        </Heading>
        <Text mb={5} fontSize="sm" color="gray.700">
          Geben Sie ein neues Passwort ein
        </Text>

        {/* TODO Don't use any as a passed type generic */}
        <SpecialFormikContextProvider<any>
          initialValues={{}}
          validationSchema={newAccountFormYupSchema}
          onSubmit={async (values, actions) => {
            const { password, repeatPassword } = values;
            const { setErrors } = actions;

            setIsLoading(true);
            try {
              if (password !== repeatPassword) {
                setErrors({ repeatPassword: 'Passwort stimmt nicht überein' });
                setIsLoading(false);
              } else {
                if (cognitoUser) {
                  cognitoUser.completeNewPasswordChallenge(password, null, {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onSuccess: async (session) => {
                      log(LogLevel.info, 'NEW_ACCOUNT', {
                        label: 'NewAccount',
                        message: `New account has successfully changed the temporary password.`,
                      });
                      // Session has been created
                      const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();

                      if (cognitoUser instanceof CognitoUser) {
                        setCognitoUser(cognitoUser);
                      }
                      const cognitoUserSub = cognitoUser.getUsername(); // This seems to be equal to the sub.
                      if (!cognitoUserSub) {
                        throw new Error('Cognito user has no username, which is impossible.');
                      }
                      if (await hasCognitoGroup(cognitoUser, ROLES.Admin)) {
                        void router.push('/admin');
                        return;
                      } else {
                        const cognitoUserSub = cognitoUser.getUsername(); // This seems to be qual to the sub.
                        if (!cognitoUserSub) {
                          throw new Error('Cognito user has no username, which is impossible.');
                        }

                        const meResponse = await Axios.get<Me>('/api/me');
                        const user = meResponse.data;
                        setAuth(user);

                        if (user.userType === 'AGENT') {
                          const variables: UpdateAgentModelMutationVariables = {
                            input: {
                              id: user.id,
                              status: null,
                              cognitoStatus: CognitoUserStatusType.CONFIRMED,
                            },
                          };
                          (await API.graphql({
                            query: updateAgentModel,
                            variables,
                          })) as GraphQLResult<UpdateAgentModelMutation>;
                        }
                        if (user.userType === 'CLIENT') {
                          const variables: UpdateClientModelMutationVariables = {
                            input: {
                              id: user.id,
                              status: null,
                              cognitoStatus: CognitoUserStatusType.CONFIRMED,
                            },
                          };
                          (await API.graphql({
                            query: updateClientModel,
                            variables,
                          })) as GraphQLResult<UpdateClientModelMutation>;
                        }
                        toast({
                          title: 'Login erfolgreich',
                          description: `Wilkommen ${user.firstName} ${user.lastName}`,
                          isClosable: true,
                        });

                        if (meetingIdRedirect) {
                          void router.push(`/video-conference/${meetingIdRedirect}?mediaRegion=${mediaRegion}`);
                        } else {
                          if (user.userType === 'AGENT') {
                            void router.push('/agent');
                          }
                          if (user.userType === 'CLIENT') {
                            void router.push('/client/welcome');
                          }
                        }
                      }
                      await axios.patch(`/api/cognito/sync-cognito-status/${cognitoUserSub}`);
                      setIsLoading(false);
                    },
                    onFailure: (err) => {
                      onNewPasswordError(err);
                    },
                  });
                }
              }
            } catch (e) {
              onNewPasswordError(e);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} noValidate>
              <FormGridLayout
                columns={1}
                fields={[
                  <PasswordFormikField
                    key="password"
                    name="password"
                    label="Passwort"
                    isRequired={true}
                    showRequiredIcon={false}
                  />,
                  <PasswordFormikField
                    key="repeatPassword"
                    name="repeatPassword"
                    label="Passwort wiederholen"
                    isRequired={true}
                    showRequiredIcon={false}
                    disabled={!!props.errors.password || !props.values.password}
                  />,
                ]}
              />
              <Button
                type="submit"
                isLoading={isLoading}
                mt={1}
                py={6}
                w="100%"
                bg="brand.primary.500"
                borderRadius="4px"
                color="white"
                fontSize="md"
                fontWeight="normal"
                _hover={{ bg: 'brand.primary.900' }}
                isDisabled={
                  !props.values.password || !props.isValid || props.values.password !== props.values.repeatPassword
                }
              >
                Übernehmen
              </Button>
            </form>
          )}
        </SpecialFormikContextProvider>
      </Box>
    </>
  );
};

NewAccountForm.getLayout = getAuthenticationLayout;

export default NewAccountForm;
