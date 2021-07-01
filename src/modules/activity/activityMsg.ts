import { UseToastOptions } from '@chakra-ui/react';

/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

/**
 * SUCCESS: Creating client activity toast
 */
export const activityToastCreatingClientActivitySuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Aktivität erstellt',
    description: 'Eine Aktivität wurde erfolgreich erstellt.',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Deleting client activity toast
 */
export const activityToastDeletingClientActivitySuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Datensatz wurde gelöscht.',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Updating client activity toast
 */
export const activityToastUpdatingClientActivitySuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'success',
    title: 'Änderungen erfolgreich übernommen',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating client activity toast
 */
export const activityToastCreatingClientActivityErr = (
  errorCode: string,
  options?: UseToastOptions
): UseToastOptions => {
  return {
    status: 'error',
    title: `Fehler beim Erstellen`,
    description: `Beim Erstellen der Aktivität ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Loading client activities toast
 */
export const activityToastLoadingUnknownErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Laden',
    description: `Beim Laden der Aktivitätsdaten ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Deleting client activity toast
 */
export const activityToastDeletingClientActivityErr = (
  errorCode: string,
  options?: UseToastOptions
): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Löschen der Aktivität ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating client activity toast
 */
export const activityToastUpdatingClientActivityErr = (
  errorCode: string,
  options?: UseToastOptions
): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Aktualisieren',
    description: `Beim Aktualisieren der Aktivität ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Client has activities toast
 */
export const activityToastExistingActivitiesErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen des Kunden',
    description: `Der Kunde konnte nicht gelöscht werden, weil es noch Aktivitäten von ihm vorhanden sind. Bitte löschen Sie zuerst die Aktivitäten des Kunden! (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
