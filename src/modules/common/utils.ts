import axios from 'axios';
import { FormikContextType } from 'formik';
import { defaultErrorMessages } from 'jexity-app/form/errorMessages';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { Dispatch } from 'react';
import { isAgent, Me } from '../auth/authStore';
import MeetingModel from '../meetings/api/MeetingModel';
import { yupEmailRequired } from './yupSchemaFields';
import { createStandaloneToast } from '@chakra-ui/react';
import { hasOwnProperty } from 'src/utils/type-utils/hasOwnProperty';
import { GetClientModelQuery } from 'src/API';
import { PromiseValue } from 'type-fest';
import { requestClientById } from '../client/clientService';
import { ClientOverviewModel } from '../client/api/ClientModel';
import { MeetingOverviewModel } from 'src/pages/agent/meetings';

export function isModerator(me?: Me, meeting?: MeetingModel | null): boolean {
  if (me && meeting) {
    const meIsAgent = isAgent(me);
    return meIsAgent && meeting.moderatorId === me.id;
  }
  return false;
}

export const handleEmailOnBlur = async (
  formikBag: FormikContextType<any> | null,
  e: React.FocusEvent<HTMLInputElement>,
  setLoading: Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  if (formikBag) {
    const { setStatus, setFieldError, handleBlur } = formikBag;
    const id = e.target.id;
    const email = e.target.value;
    const toast = createStandaloneToast();

    handleBlur(e);
    setLoading(true);
    setStatus('checking-email');

    try {
      const isValid = await yupEmailRequired().isValid(email);

      if (isValid) {
        const response = await axios.get(`/api/email/exists?email=${email}`);
        const emailAlreadyExist = response.data;

        if (emailAlreadyExist) {
          setFieldError(id, defaultErrorMessages.emailAlreadyExist);
        }
      }
    } catch (e) {
      log(LogLevel.error, e.message, e);
      const errorCode = log(LogLevel.error, e, {
        label: 'HandleEmailOnBlur',
        ...e,
      });
      toast({
        title: 'Fehler',
        description: `Fehler beim Überprüfen der E-Mail, ob sie vorhanden ist oder nicht. (Fehlercode: ${errorCode})`,
        status: 'error',
        duration: 15000,
        isClosable: true,
      });
    } finally {
      setStatus(undefined);
      setLoading(false);
    }
  }
};

export const isUnauthorizedError = (err: unknown): boolean => {
  if (typeof err === 'object' && err !== null && hasOwnProperty(err, 'errors')) {
    const errorsArr = err.errors;
    if (Array.isArray(errorsArr) && errorsArr.length > 0) {
      return errorsArr.find((err: any) => err.errorType === 'Unauthorized');
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const formatSalutation = (
  client:
    | Omit<NonNullable<PromiseValue<ReturnType<typeof requestClientById>>>, '__typename'>
    | NonNullable<PromiseValue<ReturnType<typeof requestClientById>>>['contractor']
    | ClientOverviewModel
    | MeetingOverviewModel['client']
    | null
): string => {
  if (client) {
    const salutation = client.salutation ? `${client.salutation} ` : '';
    const title = client.title ? `${client.title} ` : '';
    return `${salutation}${title}${client.firstName} ${client.lastName}`;
  }

  return '';
};
