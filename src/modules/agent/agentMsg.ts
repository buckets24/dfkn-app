import { UseToastOptions } from '@chakra-ui/react';

export const agentMsgLoadingLabel = 'FetchAgent';
/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

/**
 * SUCESS: Creating agent toast
 */
export const agentToastCreatingAgentSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Berater erstellt',
    description: 'Der Berater wurde erfolgreich erstellt',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS: Updating agent toast
 */
export const agentToastUpdatingAgentSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Änderungen erfolgreich übernommen',
    status: 'success',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS: Deleting agent toast
 */
export const agentToastDeletingAgentSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Datensatz wurde gelöscht.',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating agent toast
 */
export const agentToastCreatingAgentErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Erstellen',
    description: `Beim Erstellen des Beraters ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating agent toast
 */
export const agentToastUpdatingAgentErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Aktualisieren',
    description: `Beim Aktualisieren des Berater ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Loading agents toast
 */
export const agentToastLoadingUnknowErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Laden',
    description: `Beim Laden der Beraterdaten ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Deleting agents toast
 */
export const agentToastDeletingAgentErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Löschen des Berater ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Toggling status of agent toast
 */
export const agentToastUpdateStatusAgentErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Umschalten des Status des Beraters ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: User exist toast
 */
export const agentMsgUserExistsErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Laden',
    description: `Die E-Mail Adresse ist bereits in Verwendung. Bitte geben Sie eine andere Adresse ein. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Agent has client toast
 */
export const agentMsgExistingClientsErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Fehler beim Löschen',
    description: `Beim Löschen des Berater ist ein Fehler aufgetreten. Es scheint, dass der Berater immer noch Kunden hat. Ein Berater mit Kundendaten kann nicht gelöscht werden. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * SUCCESS: Successfully sent a temporary password
 */
export const agentToastResendPasswordSuccess = (options?: UseToastOptions): UseToastOptions => {
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
export const agentToastResendPasswordErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Erneutes Senden des Passworts fehlgeschlagen',
    description: `Das temporäre Kennwort konnte nicht an den Berater gesendet werden. (Fehlercode: ${errorCode})`,
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
