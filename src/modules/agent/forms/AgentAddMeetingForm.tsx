import { Button, ButtonGroup, useToast } from '@chakra-ui/react';
import { DateFormikField } from 'jexity-app/form/fields/DateField';
import { SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { CalendarIcon } from 'jexity-app/icons/CalendarIcon';
import { ChevronIcon } from 'jexity-app/icons/ChevronIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import React, { FC, memo, useEffect, useState } from 'react';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import useClientsByOwnerIdInfiniteQuery from 'src/modules/client/query-hooks/useClientsByOwnerInfiniteQuery';
import { formatSalutation } from 'src/modules/common/utils';
import { yupOptions, yupString } from 'src/modules/common/yupSchemaFields';
import { MeetingEditFormValues } from 'src/modules/meetings/api/MeetingModel';
import { meetingToastCreateMeetingErr } from 'src/modules/meetings/meetingsMsg';
import useCreateMeetingMutation from 'src/modules/meetings/query-hooks/useCreateMeetingMutation';
import { useContext, useContextSelector } from 'use-context-selector';
import { object } from 'yup';

export const AgentAddMeetingFormContent: FC<{ onClose: () => void }> = memo(({ onClose }) => {
  const formikBag = useContext(SpecialFormikContext);
  const values = useContextSelector(SpecialFormikContext, (state) => state?.values);
  const formikIsValid = useContextSelector(SpecialFormikContext, (state) => state?.isValid);
  const [isValid, setIsValid] = useState<boolean>(false);
  const me = useAuthStore(getMe);
  const toast = useToast();
  const { status, isLoading, data, error, hasNextPage, fetchNextPage } = useClientsByOwnerIdInfiniteQuery(me?.sub, {
    enabled: false,
  });

  useEffect(() => {
    if (hasNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage]);

  const clients =
    data?.pages
      .map((page) => page?.items)
      .flat()
      .filter(removeEmptyArrayItems) ?? [];

  useEffect(() => {
    if (values && Object.values(values).length > 0) {
      setIsValid(formikIsValid ?? false);
    }
  }, [values, formikIsValid]);

  return (
    <form onSubmit={formikBag?.handleSubmit} noValidate>
      <FormGridLayout
        columns={[1]}
        fields={[
          <SelectFormikField
            key="clientId"
            name="clientId"
            label="Kundenname"
            isRequired
            showRequiredIcon
            options={clients.map((client) => ({
              key: `${client.id}`,
              type: 'formStringOption',
              value: `${client.id}`,
              label: formatSalutation(client),
            }))}
            rightIcon={<ChevronIcon direction="bottom" color="gray.500" />}
          />,
          <DateFormikField
            key="meetingDateTime"
            name="meetingDateTime"
            label="Wählen Sie das Datum und die Uhrzeit aus"
            rightIcon={<CalendarIcon color="gray.500" />}
            isRequired
            withTime
            disablePastDates
            disablePastTime
            showRequiredIcon
            errorMessageSpacer
            isReadOnly
          />,
        ]}
      />
      <ButtonGroup variant="solid" spacing="4">
        <Button
          type="submit"
          colorScheme="brand.primary"
          isLoading={formikBag?.isSubmitting}
          loadingText="Hinzufügen.."
          size="lg"
          fontWeight={500}
          fontSize="sm"
          isDisabled={!isValid || !clients.find((client) => client.id === formikBag?.values?.clientId)}
          _hover={{
            bg: 'brand.primary.900',
          }}
        >
          Meeting Erstellen
        </Button>
        <Button
          variant="outline"
          size="lg"
          fontWeight={500}
          fontSize="sm"
          borderWidth="1px"
          borderColor="brand.primary.500"
          borderRadius="4px"
          color="brand.primary.500"
          _hover={{
            bg: 'brand.primary.100',
          }}
          onClick={() => {
            formikBag?.resetForm();
            onClose();
          }}
        >
          Abbrechen
        </Button>
      </ButtonGroup>
    </form>
  );
});

export const AgentAddMeetingForm: FC<{ onClose: () => void }> = ({ onClose }) => {
  const me = useAuthStore(getMe);
  const toast = useToast();
  const { status, isLoading, data, error, hasNextPage, fetchNextPage } = useClientsByOwnerIdInfiniteQuery(me?.sub, {
    enabled: false,
  });

  const clients =
    data?.pages
      .map((page) => page?.items)
      .flat()
      .filter(removeEmptyArrayItems) ?? [];

  const createMeetingMutation = useCreateMeetingMutation({
    onSuccess: (result) => {
      log(LogLevel.info, 'ADD_MEETING', {
        label: 'AgentAddMeetingForm',
        message: `A meeting with the client ${result?.clientId} was successfully created`,
      });
    },
  });

  const meetingEditFormYupSchema = object().shape({
    meetingDateTime: yupString(true),
    clientId: yupOptions(
      clients.map((client) => client.id),
      true,
      null,
      'Bitte wählen Sie einen Kunden aus'
    ),
  });

  const initialValues: MeetingEditFormValues = {
    meetingDateTime: '',
    clientId: '',
    moderatorId: '',
    moderatorName: '',
  };

  useEffect(() => {
    if (hasNextPage) {
      void fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, data]);

  return (
    <SpecialFormikContextProvider<MeetingEditFormValues>
      initialValues={initialValues}
      validationSchema={meetingEditFormYupSchema}
      onSubmit={async (values, actions) => {
        const meetingDateTime = values.meetingDateTime as string;
        const clientId = values.clientId;
        const client = clients.find((client) => client.id === clientId);
        try {
          if (!me) {
            throw new Error('Attempting to create a meeting with no agent logged in');
          }

          if (me.userType !== 'AGENT') {
            throw new Error('Currently authenticated user is not an AGENT');
          }

          if (client && me.sub && client.sub) {
            await createMeetingMutation.mutateAsync({
              clientId: clientId,
              moderatorId: me.id,
              moderatorName: `${me.firstName} ${me.lastName}`,
              meetingDateTime: meetingDateTime,
              owner: me.sub,
              editors: [me.sub, client.sub],
            });
          }
        } catch (e) {
          const errorCode = log(LogLevel.error, e, { label: 'AgentAddMeetingForm', ...e });
          toast(meetingToastCreateMeetingErr(errorCode));
        }
        actions.resetForm();
        onClose();
        actions.setSubmitting(false);
      }}
    >
      <AgentAddMeetingFormContent onClose={onClose} />
    </SpecialFormikContextProvider>
  );
};
