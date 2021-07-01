import { Box, Divider, Grid, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Card from 'jexity-app/card/Card';
import { DateFormikField } from 'jexity-app/form/fields/DateField';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import FormActionsContainer from 'jexity-app/layout/FormActionsContainer';
import { log, LogLevel } from 'jexity-app/utils/logger';
import React, { FC, memo, useMemo, useState } from 'react';
import { GetClientModelQuery } from 'src/API';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import queryClient from 'src/queryClient';
import { useContext } from 'use-context-selector';
import { ClientEditFormValues, clientEditFormYupSchema } from '../api/ClientModel';
import {
  clientToastCreatingClientErr,
  clientToastCreatingClientSuccess,
  clientToastUpdatingClientErr,
  clientToastUpdatingClientSuccess,
  clientToastUserExistsErr,
} from '../clientMsg';
import { ClientEditFormManagement } from './ClientEditFormManagement';
import { handleEmailOnBlur } from 'src/modules/common/utils';
import SUBSIDIARIES from 'src/modules/agent/api/subsidiaries';
import useFetchCognitoQuery from 'src/modules/cognito/query-hooks/useFetchCognitoQuery';
import useUpdateClientMutation from '../query-hooks/useUpdateClientMutation';
import useCreateClientMutation from '../query-hooks/useCreateClientMutation';
import { CLIENTS_QUERY_KEY } from '../query-hooks/clientQueryKeys';
import { UseClientByIdQueryValue } from '../query-hooks/useClientByIdQuery';
import { defaultErrorMessages } from 'jexity-app/form/errorMessages';

export type ExistingClientType = GetClientModelQuery['getClientModel'];

export interface ClientEditFormProps {
  client?: ExistingClientType;
  onCreateClient?: (createdClient: NonNullable<GetClientModelQuery['getClientModel']>) => void;
}

export const ClientEditFormContent: FC<{ client: ExistingClientType | undefined }> = memo(({ client = undefined }) => {
  const formikBag = useContext(SpecialFormikContext);
  const updateMode = !!client;
  const [checkingEmail, setCheckingEmail] = useState<boolean>(false);
  const fetchCognito = useFetchCognitoQuery(client?.email);
  const clientUserStatus = client?.cognitoStatus ?? fetchCognito.data?.UserStatus;

  return (
    <form onSubmit={formikBag?.handleSubmit} noValidate>
      <Grid templateColumns={['1fr 1fr']} gap={5}>
        <Card>
          <Heading as="h3" size="md" p={6} fontFamily="body">
            Personendaten
          </Heading>
          <Divider borderColor="gray.200" />
          <FormGridLayout
            p={6}
            columns={[1, null, null, 2]}
            spacingX={5}
            spacingY={5}
            fields={[
              <StringFormikField key="title" name="title" label="Title" />,
              <SelectFormikField
                key="salutation"
                name="salutation"
                label="Anrede"
                isRequired={true}
                options={[
                  {
                    type: 'formStringOption',
                    key: '1',
                    label: 'Frau',
                    value: 'Frau',
                  },
                  {
                    type: 'formStringOption',
                    key: '2',
                    label: 'Herr',
                    value: 'Herr',
                  },
                ]}
                showRequiredIcon
              />,
              <StringFormikField key="firstName" name="firstName" label="Vorname" isRequired={true} />,
              <StringFormikField key="lastName" name="lastName" label="Nachname" isRequired={true} />,
              <EmailFormikField
                key="email"
                name="email"
                label="E-Mail"
                isRequired={true}
                isDisabled={clientUserStatus === 'CONFIRMED'}
                isLoading={checkingEmail}
                hasChecker={formikBag?.values.email !== client?.email}
                onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleEmailOnBlur(formikBag, e, setCheckingEmail)}
              />,
              <SelectFormikField
                key="maritalStatus"
                name="maritalStatus"
                label="Familienstand"
                options={[
                  {
                    type: 'formStringOption',
                    key: 'ledig',
                    value: 'ledig',
                    label: 'Ledig',
                  },
                  {
                    type: 'formStringOption',
                    key: 'verlobt',
                    value: 'verlobt',
                    label: 'Verlobt',
                  },
                  {
                    type: 'formStringOption',
                    key: 'verheiratet',
                    value: 'verheiratet',
                    label: 'Verheiratet',
                  },
                  {
                    type: 'formStringOption',
                    key: 'geschieden',
                    value: 'geschieden',
                    label: 'Geschieden',
                  },
                  {
                    type: 'formStringOption',
                    key: 'verwitwet',
                    value: 'verwitwet',
                    label: 'Verwitwet',
                  },
                ]}
              />,
              <StringFormikField key="birthPlace" name="birthPlace" label="Geburtsort " />,
              <DateFormikField key="birthday" name="birthday" label="Geburtsdatum" disableFutureDates />,
              <StringFormikField key="taxId" name="taxId" label="Steueridentifikationsnummer" />,
              updateMode && (
                <StringFormikField key="subsidiary" name="subsidiary" label="Geschäftsstelle" isRequired disabled />
              ),
            ]}
          />
        </Card>
        <Card>
          <Heading as="h3" size="md" p={6} fontFamily="body">
            Kontaktdaten
          </Heading>
          <Divider borderColor="gray.200" />
          <FormGridLayout
            p={6}
            columns={[1, null, null, 2]}
            spacingX={5}
            spacingY={5}
            fields={[
              [
                <StringFormikField key="telephone" name="telephone" label="Telefon (Privat)" />,
                <StringFormikField key="fax" name="fax" label="Telefax (Privat)" />,
              ],
              <StringFormikField key="mobile" name="mobile" label="Mobiltelefon" />,
              [
                <StringFormikField key="postCode" name="postCode" label="PLZ" />,
                <StringFormikField key="place" name="place" label="Ort" />,
              ],
              <StringFormikField key="streetHouseNumber" name="streetHouseNumber" label="Straße, Hausnummer" />,
              <StringFormikField key="country" name="country" label="Land" />,
              <DateFormikField key="addressValidDate" name="addressValidDate" label="Adresse gültig seit" />,
              <StringFormikField key="nationality" name="nationality" label="Nationalität" />,
            ]}
          />
        </Card>
      </Grid>
      <FormActionsContainer>
        <ClientEditFormManagement client={client} formikBag={formikBag} isValid={formikBag?.isValid} />
      </FormActionsContainer>
    </form>
  );
});

export const ClientEditForm: FC<ClientEditFormProps> = ({ client, onCreateClient }) => {
  const me = useAuthStore(getMe);
  const toast = useToast();

  const updateClientMutation = useUpdateClientMutation({
    onSuccess: async (responseData, variables) => {
      if (responseData) {
        if (client && variables.email !== client.email) {
          await axios.put('/api/cognito/email', {
            email: client.email,
            attributes: [
              { Name: 'email', Value: variables.email },
              {
                Name: 'email_verified',
                Value: 'true',
              },
            ],
          });
        }

        toast(clientToastUpdatingClientSuccess());
        void queryClient.setQueryData<UseClientByIdQueryValue>([CLIENTS_QUERY_KEY, responseData.id], responseData);
      }
    },
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e.message, { label: 'UpdateClientMutation', ...e });
      toast(clientToastUpdatingClientErr(errorCode));
    },
  });

  const createClientMutation = useCreateClientMutation({
    onSuccess: (response, values) => {
      if (response) {
        log(LogLevel.info, 'CREATE_CLIENT', {
          label: 'ClientEditForm',
          message: `A client with an id of ${response.id} was successfully created`,
        });
        toast(
          clientToastCreatingClientSuccess({
            description: `Der Kunde ${values.title} ${values.firstName} ${values.lastName} wurde erfolgreich erstellt.`,
          })
        );
        if (onCreateClient) {
          onCreateClient(response);
        }
      }
    },
    onError: (e) => {
      if (e.type === 'USER_EXIST') {
        toast(clientToastUserExistsErr(e.errorCode));
      } else {
        toast(clientToastCreatingClientErr(e.errorCode));
      }
    },
  });

  const initialValues = useMemo<ClientEditFormValues>(
    () => ({
      email: client?.email ?? '',
      firstName: client?.firstName ?? '',
      lastName: client?.lastName ?? '',
      title: client?.title ?? '',
      addressValidDate: client?.addressValidDate ?? null,
      birthPlace: client?.birthPlace ?? '',
      birthday: client?.birthday ?? null,
      country: client?.country ?? '',
      fax: client?.fax ?? '',
      maritalStatus: client?.maritalStatus ?? '',
      mobile: client?.mobile ?? '',
      nationality: client?.nationality ?? '',
      place: client?.place ?? '',
      postCode: client?.postCode ?? '',
      salutation: client?.salutation ?? '',
      streetHouseNumber: client?.streetHouseNumber ?? '',
      taxId: client?.taxId ?? '',
      telephone: client?.telephone ?? '',
      subsidiary: SUBSIDIARIES.find((subsidiary) => subsidiary.value === client?.subsidiary)?.label ?? '',
    }),
    [client]
  );

  return (
    <Box>
      <SpecialFormikContextProvider<ClientEditFormValues>
        initialValues={initialValues}
        validationSchema={clientEditFormYupSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          if (!me?.sub) {
            return; // Should never happen, but it is impossible to create anyone logged in
          }
          if (client) {
            if (client.email !== values.email) {
              const response = await axios.get(`/api/email/exists?email=${values.email}`);
              const emailAlreadyExist = response.data;

              if (emailAlreadyExist) {
                const errorCode = log(LogLevel.error, 'EMAIL_IN_USE', {
                  label: 'ClientEditForm',
                  message: 'The email is used by an agent/client model',
                });
                actions.setFieldError('email', defaultErrorMessages.emailAlreadyExist);
                return toast(clientToastUserExistsErr(errorCode));
              }
            }

            await updateClientMutation.mutateAsync({
              id: client.id,
              subsidiary: me.subsidiary,
              ...values,
            });
          } else {
            await createClientMutation.mutateAsync({
              ...values,
              subsidiary: me.subsidiary,
            });
          }
          actions.setSubmitting(false);
        }}
      >
        <ClientEditFormContent client={client} />
      </SpecialFormikContextProvider>
    </Box>
  );
};
