import { Box, Divider, Heading, useToast } from '@chakra-ui/react';
import axios from 'axios';
import Card from 'jexity-app/card/Card';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import FormActionsContainer from 'jexity-app/layout/FormActionsContainer';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { CreateAgentModelInput, CreateAgentModelMutation, GetAgentModelQuery, ROLES } from 'src/API';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useContext, useContextSelector } from 'use-context-selector';
import { AgentEditFormValues, agentEditFormYupSchema } from '../api/AgentModel';
import queryClient from 'src/queryClient';
import {
  agentMsgUserExistsErr,
  agentToastCreatingAgentErr,
  agentToastCreatingAgentSuccess,
  agentToastUpdatingAgentErr,
  agentToastUpdatingAgentSuccess,
} from '../agentMsg';
import { handleEmailOnBlur } from 'src/modules/common/utils';
import { AgentEditFormManagement } from './AgentEditFormManagement';
import SUBSIDIARIES from '../api/subsidiaries';
import { SelectFormFieldOption } from 'jexity-app/form/fields/fieldApi';
import useUpdateAgentMutation from '../query-hooks/useUpdateAgentMutation';
import { UseAgentByIdQueryValue } from '../query-hooks/useAgentByIdQuery';
import { AGENTS_QUERY_KEY } from '../query-hooks/agentQueryKeys';
import { getAgentRoleLabel } from '../api/role';

export type ExistingAgentType = GetAgentModelQuery['getAgentModel'];

export interface AgentEditFormProps {
  /**
   * TODO
   * Omiting __typename shouldn't really be necessary.
   * Remove it after we have update authentication to not
   * use AgentModel and ClientModel
   */
  agent?: ExistingAgentType;
  onCreateAgent?: (createdClient: ExistingAgentType) => void;
}

export const AgentEditFormContent: FC<{ agent: ExistingAgentType | undefined }> = memo(({ agent = undefined }) => {
  // Check if the authenticated is an agent or admin
  const me = useAuthStore(getMe);
  const updateMode = !!agent;

  const formikBag = useContext(SpecialFormikContext);
  const values = useContextSelector(SpecialFormikContext, (state) => state?.values);
  const formikIsValid = useContextSelector(SpecialFormikContext, (state) => state?.isValid);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [checkingEmail, setCheckingEmail] = useState<boolean>(false);

  useEffect(() => {
    if (values && Object.values(values).length > 0) {
      setIsValid(formikIsValid ?? false);
    }
  }, [values, formikIsValid]);

  return (
    <form onSubmit={formikBag?.handleSubmit} noValidate>
      <FormGridLayout
        p={6}
        columns={[1, null, null, 2]}
        spacingX={5}
        spacingY={5}
        fields={[
          <StringFormikField key="firstName" name="firstName" label="Vorname" isRequired />,
          <StringFormikField key="lastName" name="lastName" label="Nachname" isRequired />,
          <SelectFormikField
            key="salutation"
            name="salutation"
            label="Anrede"
            isRequired
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
          <EmailFormikField
            key="email"
            name="email"
            label="E-Mail"
            isRequired
            isDisabled={updateMode}
            isLoading={checkingEmail}
            hasChecker
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleEmailOnBlur(formikBag, e, setCheckingEmail)}
          />,
          <SelectFormikField
            key="subsidiary"
            name="subsidiary"
            label="Geschäftsstelle"
            isRequired
            isDisabled={updateMode}
            options={SUBSIDIARIES.map<SelectFormFieldOption>((subsidiary) => ({
              key: subsidiary.value,
              value: subsidiary.value,
              label: subsidiary.label,
              type: 'formStringOption',
            }))}
            showRequiredIcon
          />,
          <SelectFormikField
            key="role"
            name="role"
            label="Rolle"
            isRequired
            isDisabled={updateMode && !!me}
            options={[
              {
                type: 'formStringOption',
                key: '1',
                value: ROLES.Director,
                label: getAgentRoleLabel(ROLES.Director),
              },
              {
                type: 'formStringOption',
                key: '2',
                value: ROLES.OfficeManager,
                label: getAgentRoleLabel(ROLES.OfficeManager),
              },
              {
                type: 'formStringOption',
                key: '3',
                value: ROLES.AgentLR2,
                label: getAgentRoleLabel(ROLES.AgentLR2),
              },
              {
                type: 'formStringOption',
                key: '4',
                value: ROLES.AgentLR1,
                label: getAgentRoleLabel(ROLES.AgentLR1),
              },
              {
                type: 'formStringOption',
                key: '5',
                value: ROLES.AgentR,
                label: getAgentRoleLabel(ROLES.AgentR),
              },
              {
                type: 'formStringOption',
                key: '6',
                value: ROLES.FinancialAdvisor,
                label: getAgentRoleLabel(ROLES.FinancialAdvisor),
              },
              {
                type: 'formStringOption',
                key: '7',
                value: ROLES.InsuranceAdvisor,
                label: getAgentRoleLabel(ROLES.InsuranceAdvisor),
              },
            ]}
            showRequiredIcon
          />,
          <StringFormikField key="streetHouseNumber" name="streetHouseNumber" label="Straße, Hausnummer" />,
          <StringFormikField key="phone" name="phone" label="Telefon" />,
          [
            <StringFormikField key="postCode" name="postCode" label="PLZ" />,
            <StringFormikField key="place" name="place" label="Ort" />,
          ],
        ]}
      />
      <FormActionsContainer>
        <AgentEditFormManagement agent={agent} formikBag={formikBag} isValid={isValid} />
      </FormActionsContainer>
    </form>
  );
});

export const AgentEditForm: FC<AgentEditFormProps> = ({ agent, onCreateAgent }) => {
  const toast = useToast();
  const updateAgentMutation = useUpdateAgentMutation(agent, {
    onSuccess: (responseData) => {
      if (responseData) {
        toast(agentToastUpdatingAgentSuccess());
        void queryClient.setQueryData<UseAgentByIdQueryValue>([AGENTS_QUERY_KEY, responseData.id], responseData);
      }
    },
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e.message, { label: 'UpdateAgentMutation', ...e });
      toast(agentToastUpdatingAgentErr(errorCode));
    },
  });

  const initialValues = useMemo<AgentEditFormValues>(
    () => ({
      email: agent?.email ?? '',
      firstName: agent?.firstName ?? '',
      lastName: agent?.lastName ?? '',
      phone: agent?.phone ?? '',
      place: agent?.place ?? '',
      postCode: agent?.postCode ?? '',
      salutation: agent?.salutation ?? '',
      streetHouseNumber: agent?.streetHouseNumber ?? '',
      role: agent?.role ?? '',
      subsidiary: agent?.subsidiary ?? '',
    }),
    [agent]
  );

  return (
    <Box>
      <Card>
        <Heading as="h3" size="md" p={6} fontFamily="body">
          Persönliche Daten
        </Heading>
        <Divider borderColor="gray.200" />
        <Box>
          <SpecialFormikContextProvider<AgentEditFormValues>
            initialValues={initialValues}
            validationSchema={agentEditFormYupSchema}
            onSubmit={async (values, actions) => {
              try {
                if (agent) {
                  await updateAgentMutation.mutateAsync({
                    id: agent.id,
                    ...values,
                  });
                } else {
                  const createAgentProps: CreateAgentModelInput = {
                    active: true,
                    ...values,
                  } as CreateAgentModelInput; // Not the best typings
                  const response = await axios.post<NonNullable<CreateAgentModelMutation['createAgentModel']>>(
                    '/api/agents',
                    createAgentProps,
                    {
                      withCredentials: true,
                    }
                  );
                  log(LogLevel.info, 'CREATE_AGENT', {
                    label: 'AgentEditForm',
                    message: `A agent with an id of ${response.data.id} was successfully created`,
                  });
                  toast(
                    agentToastCreatingAgentSuccess({
                      description: `Der Berater ${values.firstName} ${values.lastName} wurde erfolgreich erstellt`,
                    })
                  );
                  if (onCreateAgent) {
                    onCreateAgent(response.data);
                  }
                }
              } catch (e) {
                if (e.response.data.type === 'USER_EXIST') {
                  toast(agentMsgUserExistsErr(e.response.data.errorCode));
                } else {
                  toast(agentToastCreatingAgentErr(e.response.data.errorCode));
                }
              } finally {
                actions.setSubmitting(false);
              }
            }}
          >
            <AgentEditFormContent agent={agent} />
          </SpecialFormikContextProvider>
        </Box>
      </Card>
    </Box>
  );
};
