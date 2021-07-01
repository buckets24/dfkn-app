import { Box, Button, ButtonGroup, Grid, HStack, Radio, RadioGroup, Text, TextProps, useToast } from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import { DateFormikField } from 'jexity-app/form/fields/DateField';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { RichTextEditorFormikField } from 'jexity-app/rich-text-editor/RichTextEditor';
import { log, LogLevel } from 'jexity-app/utils/logger';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import { useRouter } from 'next/router';
import React, { FC, memo, useMemo } from 'react';
import { GetClientActivityModelQuery } from 'src/API';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { MEETINGS_QUERY_KEY } from 'src/modules/meetings/query-hooks/meetingQueryKeys';
import { UseMeetingByIdQueryValue } from 'src/modules/meetings/query-hooks/useMeetingByIdQuery';
import queryClient from 'src/queryClient';
import { useContext } from 'use-context-selector';
import { ClientActivityFormValues, clientActivityFormYupSchema } from '../../client/api/ClientModel';
import {
  activityToastCreatingClientActivityErr,
  activityToastCreatingClientActivitySuccess,
  activityToastUpdatingClientActivityErr,
  activityToastUpdatingClientActivitySuccess,
} from '../activityMsg';
import { CLIENT_ACTIVITIES_QUERY_KEY } from '../query-hooks/clientActivityQueryKeys';
import useCreateClientActivityMutation from '../query-hooks/useCreateClientActivityMutation';
import useUpdateClientActivityMutation from '../query-hooks/useUpdateClientActivityMutation';
import { ActivityItem } from '../table/ClientActivityTable';

export type ExistingClientActivityType = GetClientActivityModelQuery['getClientActivityModel'];

export interface ClientEditFormProps {
  activity?: ActivityItem;
  onCreateActivity?: (createdActivity: NonNullable<GetClientActivityModelQuery['getClientActivityModel']>) => void;
  onUpdateActivity?: (updatedActivity: NonNullable<GetClientActivityModelQuery['getClientActivityModel']>) => void;
  onCancel?: () => void;
}

export const ClientActivityFormContent: FC<{
  activity: ActivityItem | undefined;
  onCancel: ClientEditFormProps['onCancel'];
}> = memo(({ activity = undefined, onCancel }) => {
  const formikBag = useContext(SpecialFormikContext);
  const values = formikBag?.values;
  const labelStyle: TextProps = {
    mb: 3,
    color: 'gray.900',
    fontFamily: 'heading',
    fontSize: 'sm',
    fontWeight: 'bold',
    letterSpacing: '.4px',
  };
  // console.log(JSON.parse(values['description']));

  return (
    <form onSubmit={formikBag?.handleSubmit} noValidate>
      <Grid templateColumns={['max-content 1fr', null, null, null, 'repeat(3, max-content)']} gap={8}>
        <Box>
          <Text {...labelStyle}>Fällig am</Text>
          <DateFormikField key="dueDate" name="dueDate" label="" disablePastDates />
        </Box>
        <Box>
          <Text {...labelStyle}>Erledigt</Text>
          <RadioGroup
            pt={3}
            name="done"
            defaultValue={values['done'] ?? 'No'}
            onChange={(isDone) => formikBag?.setFieldValue('done', isDone)}
          >
            <HStack spacing={4}>
              <Radio alignItems="center !important" value="Yes" colorScheme="brand.primary">
                <Text>Ja</Text>
              </Radio>
              <Radio alignItems="center !important" value="No" colorScheme="brand.primary">
                <Text>Nein</Text>
              </Radio>
            </HStack>
          </RadioGroup>
        </Box>
        <Box>
          <Text {...labelStyle}>Priorität</Text>
          <RadioGroup
            pt={3}
            name="priority"
            defaultValue={values['priority'] ?? 'NORMAL'}
            onChange={(priority) => formikBag?.setFieldValue('priority', priority)}
          >
            <HStack spacing={4}>
              <Radio alignItems="center !important" value="HIGH" colorScheme="support.alert">
                <Text color="support.alert.500">Hoch</Text>
              </Radio>
              <Radio alignItems="center !important" value="NORMAL" colorScheme="brand.primary">
                <Text color="brand.primary.500">Normal</Text>
              </Radio>
              <Radio alignItems="center !important" value="LOW" colorScheme="support.success">
                <Text color="support.success.500">Niedrig</Text>
              </Radio>
            </HStack>
          </RadioGroup>
        </Box>
      </Grid>
      <Box mt={10}>
        <Text
          {...labelStyle}
          color={
            formikBag?.errors['description'] && formikBag.touched['description'] ? 'support.alert.500' : 'gray.900'
          }
        >
          Beschreibung *
        </Text>
        <RichTextEditorFormikField name="description" value={values['description'] ?? ''} isRequired />
      </Box>

      <ButtonGroup justifyContent="flex-end" mt={3} w="100%" variant="solid" spacing={4} fontFamily="heading">
        <Button
          type="submit"
          isLoading={formikBag?.isSubmitting}
          loadingText="Speichern…"
          px="32px"
          maxH="40px"
          bg="brand.primary.500"
          color="white"
          borderRadius="4px"
          _hover={{
            bg: 'brand.primary.900',
          }}
          isDisabled={!formikBag?.isValid}
        >
          Speichern
        </Button>
        <Button
          variant="outline"
          px="32px"
          maxH="40px"
          borderWidth="1px"
          borderColor="brand.primary.500"
          borderRadius="4px"
          color="brand.primary.500"
          _hover={{
            bg: 'brand.primary.100',
          }}
          onClick={() => {
            formikBag?.resetForm();
            if (onCancel) {
              onCancel();
            }
          }}
        >
          Abbrechen
        </Button>
      </ButtonGroup>
    </form>
  );
});

export const ClientActivityForm: FC<ClientEditFormProps> = ({
  activity,
  onCreateActivity,
  onUpdateActivity,
  onCancel,
}) => {
  const me = useAuthStore(getMe);
  const toast = useToast();
  const router = useRouter();
  const id = routerQueryGetAsString(router.query.id);
  const meeting = queryClient.getQueryData<UseMeetingByIdQueryValue>([MEETINGS_QUERY_KEY, id]);
  const clientId = meeting?.clientId ?? id;

  const updateClientActivityMutation = useUpdateClientActivityMutation({
    onSuccess: async (response, variables) => {
      if (response) {
        toast(activityToastUpdatingClientActivitySuccess());
        void queryClient.setQueryData([CLIENT_ACTIVITIES_QUERY_KEY, response.id], response);
        if (onUpdateActivity) {
          onUpdateActivity(response);
        }
      }
    },
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e.message, { label: 'UpdateClientActivityMutation', ...e });
      toast(activityToastUpdatingClientActivityErr(errorCode));
    },
  });

  const createClientActivityMutation = useCreateClientActivityMutation({
    onSuccess: (response) => {
      if (response) {
        log(LogLevel.info, 'CREATE_CLIENT_ACTIVITY', {
          label: 'ClientActivityForm',
          message: `An activity with an id of ${response.id} was successfully created`,
        });
        toast(activityToastCreatingClientActivitySuccess());
        if (onCreateActivity) {
          onCreateActivity(response);
        }
      }
    },
    onError: (e) => {
      const errorCode = log(LogLevel.error, 'FAILED_TO_CREATE_CLIENT_ACTIVITY', {
        label: 'ClientActivityForm',
        message: e.message,
      });
      toast(activityToastCreatingClientActivityErr(errorCode));
    },
  });

  const initialValues = useMemo<ClientActivityFormValues>(
    () => ({
      dueDate: activity?.dueDate ?? null,
      description: activity?.description ?? '',
      done: activity?.done ?? 'No',
      priority: activity?.priority ?? 'NORMAL',
    }),
    [activity]
  );

  return (
    <Box>
      <SpecialFormikContextProvider<ClientActivityFormValues>
        initialValues={initialValues}
        validationSchema={clientActivityFormYupSchema}
        enableReinitialize
        onSubmit={async (values, actions) => {
          if (!me?.sub || !clientId) {
            return; // Should never happen, but it is impossible to create anyone logged in
          }
          if (activity) {
            await updateClientActivityMutation.mutateAsync({
              ...values,
              id: activity.id,
              updatedBy: me.sub,
              editors:
                Array.isArray(activity.editors) && activity.editors[0] !== me.sub
                  ? [...activity.editors, me.sub]
                  : activity.editors,
            });
          } else {
            await createClientActivityMutation.mutateAsync({
              ...values,
              clientId: clientId,
              owner: me.sub,
              updatedBy: me.sub,
              editors: [me.sub],
            });
          }
          actions.setSubmitting(false);
        }}
      >
        <ClientActivityFormContent activity={activity} onCancel={onCancel} />
      </SpecialFormikContextProvider>
    </Box>
  );
};
