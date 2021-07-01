import { UseToastOptions } from '@chakra-ui/react';

export const clientMsgLoadingLabel = 'FetchClient';
/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

/**
 * SUCESS: Creating client toast
 */
export const clientToastCreatingClientSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Kunde erstellt',
    description: 'Der Kunde wurde erfolgreich erstellt.',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS: Updating client toast
 */
export const clientToastUpdatingClientSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'success',
    title: 'Änderungen erfolgreich übernommen',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS: Deleting client toast
 */
export const clientToastDeletingClientSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Datensatz wurde gelöscht.',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating client toast
 */
export const clientToastCreatingClientErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: `Fehler beim Erstellen`,
    description: `Beim Erstellen des Kunden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating contractor toast
 */
export const contractorToastCreatingContractorErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: `Fehler beim Erstellen`,
    description: `Beim Erstellen des Vertragspartner ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating client toast
 */
export const clientToastUpdatingClientErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Aktualisieren',
    description: `Beim Aktualisieren des Kunden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Loading clients toast
 */
export const clientToastLoadingUnknownErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Laden',
    description: `Beim Laden der Clientdaten ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Deleting clients toast
 */
export const clientToastDeletingClientErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Löschen des Kunden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Deleting contractor toast
 */
export const contractorToastDeletingContractorErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Löschen des Vertragspartner ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Toggling status of client toast
 */
export const clientToastUpdateStatusClientErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Umschalten des Status des Kunde ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: User exist toast
 */
export const clientToastUserExistsErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: `Die E-Mail Adresse ist bereits in Verwendung. Bitte geben Sie eine Andere Adresse ein. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Client has meetings toast
 */
export const clientToastExistingMeetingsErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen des Kunden',
    description: `Der Kunde konnte nicht gelöscht werden, weil es noch Meetings von ihm vorhanden sind. Bitte löschen Sie zuerst die Meetings des Kunden! (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Successfully sent a temporary password
 */
export const clientToastResendPasswordSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Neues temporäres Passwort erfolgreich gesendet',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Failed to resend temporary password email
 *
 * TODO Translate
 */
export const clientToastResendPasswordErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Erneutes Senden des Passworts fehlgeschlagen',
    description: `Das temporäre Kennwort konnte nicht an den Kunde gesendet werden (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
