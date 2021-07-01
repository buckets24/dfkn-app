import { UseToastOptions } from '@chakra-ui/react';

/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

/**
 * SUCESS: Creating meeting toast
 */
export const meetingToastCreateMeetingSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Datensatz wurde erfolgreich erstellt',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Deleting meeting toast
 */
export const meetingToastDeletingMeetingSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Datensatz wurde gelöscht.',
    isClosable: true,
    ...options,
  };
};

/**
 * INFO: Client ended the meeting
 */
export const meetingToastClientEndMeetingSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Das Meeting wurde erfolgreich beendet.',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating meeting toast
 */
export const meetingToastCreateMeetingErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Erstellen',
    description: `Beim Erstellen des Meetings ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Deleting meeting toast
 */
export const meetingToastDeletingMeetingErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Löschen der Besprechung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating meeting toast
 */
export const meetingToastUpdatingMeetingErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Aktualisieren von Besprechungen. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: switching video toast
 */
export const meetingToastSwitchingVideoErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Umschalten des Videos. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Loading meetings toast
 */
export const meetingToastLoadingUnknownErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Laden',
    description: `Beim Laden der Besprechungsdaten ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
