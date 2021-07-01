import { Box, Divider, Grid, Heading, useToast } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { DateFormikField } from 'jexity-app/form/fields/DateField';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import FormActionsContainer from 'jexity-app/layout/FormActionsContainer';
import { log, LogLevel } from 'jexity-app/utils/logger';
import React, { FC, memo, useMemo } from 'react';
import { useMutation } from 'react-query';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { yupEmail } from 'src/modules/common/yupSchemaFields';
import queryClient from 'src/queryClient';
import { useContext } from 'use-context-selector';
import { object } from 'yup';
import { clientEditFormSchemaShape, ClientEditFormValues, Contractor } from '../api/ClientModel';
import {
  clientToastCreatingClientSuccess,
  clientToastUpdatingClientErr,
  clientToastUpdatingClientSuccess,
  clientToastUserExistsErr,
  contractorToastCreatingContractorErr,
} from '../clientMsg';
import { updateClient } from '../clientService';
import { CLIENTS_QUERY_KEY } from '../query-hooks/clientQueryKeys';
import { ExistingClientType } from './ClientEditForm';
import { ContractorEditFormManagement } from './ContractorEditFormManagement';

export interface ContractorEditFormProps {
  client?: ExistingClientType;
}

export const ContractorEditFormContent: FC<{
  contractor: Contractor | undefined;
}> = memo(({ contractor = undefined }) => {
  const formikBag = useContext(SpecialFormikContext);

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
              <EmailFormikField key="email" name="email" label="E-Mail" hasChecker />,
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
        <ContractorEditFormManagement contractor={contractor} formikBag={formikBag} isValid={formikBag?.isValid} />
      </FormActionsContainer>
    </form>
  );
});

export const ContractorEditForm: FC<ContractorEditFormProps> = ({ client }) => {
  const me = useAuthStore(getMe);
  const toast = useToast();
  const contractor = client?.contractor;
  const updateContractorMutation = useMutation(
    async (formValues: ClientEditFormValues) => {
      try {
        if (client && me) {
          const { createdAt, updatedAt, meetings, onlineDocuments, agentDocuments, ...existingClient } = client;
          const input = {
            ...existingClient,
            contractor: { ...formValues },
          };
          log(LogLevel.info, 'UPDATE_CONTRACTOR', {
            label: 'ContractorEditForm',
            message: `Updated the data of the contractor with a client id of ${client.id}`,
          });
          toast(clientToastUpdatingClientSuccess());
          return await updateClient(input);
        }
      } catch (e) {
        const errorCode = log(LogLevel.error, e.message, e);
        toast(clientToastUpdatingClientErr(errorCode));
      }
    },
    {
      onSuccess: (responseData) => {
        if (responseData) {
          queryClient.setQueryData([CLIENTS_QUERY_KEY, responseData.id], responseData);
        }
      },
    }
  );

  const initialValues = useMemo<ClientEditFormValues>(
    () => ({
      email: contractor?.email ?? '',
      firstName: contractor?.firstName ?? '',
      lastName: contractor?.lastName ?? '',
      title: contractor?.title ?? '',
      addressValidDate: contractor?.addressValidDate ?? null,
      birthPlace: contractor?.birthPlace ?? '',
      birthday: contractor?.birthday ?? null,
      country: contractor?.country ?? '',
      fax: contractor?.fax ?? '',
      maritalStatus: contractor?.maritalStatus ?? '',
      mobile: contractor?.mobile ?? '',
      nationality: contractor?.nationality ?? '',
      place: contractor?.place ?? '',
      postCode: contractor?.postCode ?? '',
      salutation: contractor?.salutation ?? '',
      streetHouseNumber: contractor?.streetHouseNumber ?? '',
      taxId: contractor?.taxId ?? '',
      telephone: contractor?.telephone ?? '',
    }),
    [contractor]
  );

  /**
   * Made the email not mandatory for contractor
   */
  const contractorEditFormYupSchemaShape = {
    ...clientEditFormSchemaShape,
    email: yupEmail(false),
  };

  const contractorEditFormYupSchema = object().shape(contractorEditFormYupSchemaShape);

  return (
    <Box>
      <SpecialFormikContextProvider<ClientEditFormValues>
        initialValues={initialValues}
        validationSchema={contractorEditFormYupSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          if (!me?.sub) {
            return; // Should never happen, but it is impossible to create anyone logged in
          }

          try {
            if (contractor) {
              await updateContractorMutation.mutateAsync(values);
            } else {
              if (client) {
                const { createdAt, updatedAt, meetings, onlineDocuments, agentDocuments, ...existingClient } = client;
                const input = {
                  ...existingClient,
                  contractor: { ...values },
                };
                await updateClient(input);
                log(LogLevel.info, 'CREATE_CONTRACTOR', {
                  label: 'ContractorEditForm',
                  message: `A contractor with a client id of ${client.id} was successfully created`,
                });
                toast(
                  clientToastCreatingClientSuccess({
                    description: `Der Vertragspartner ${values.title} ${values.firstName} ${values.lastName} wurde erfolgreich erstellt.`,
                  })
                );
              }
            }
          } catch (e) {
            if (e.response.data.type === 'USER_EXIST') {
              toast(clientToastUserExistsErr(e.response.data.errorCode));
            } else {
              toast(contractorToastCreatingContractorErr(e.response.data.errorCode));
            }
          } finally {
            actions.setSubmitting(false);
          }
        }}
      >
        <ContractorEditFormContent contractor={contractor} />
      </SpecialFormikContextProvider>
    </Box>
  );
};
