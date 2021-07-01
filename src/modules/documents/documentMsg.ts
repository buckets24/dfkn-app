import { UseToastOptions } from '@chakra-ui/react';

/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

/**
 * SUCESS: Creating document toast
 */
export const documentToastCreateDocumentSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Änderungen erfolgreich übernommen',
    status: 'success',
    isClosable: true,
    ...options,
  };
};

/**
 * SUCESS:  Updating document visible to client
 */
export const documentToastUpdateDocumentVisibleToClientSuccess = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Sichtbarkeit des Dokumentes geändert',
    status: 'success',
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Requesting document toast
 */
export const documentToastRequestingDocumentErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Anfordern des Dokuments. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Requesting document toast
 */
export const documentToastRequestingDocumentPatchesErr = (
  errorCode: string,
  options?: UseToastOptions
): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Anfordern des Dokuments Patches. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Applying signature toast
 */
export const signatureToastApplyingErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Anwenden der Signatur. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Unknown signature token toast
 */
export const signatureTokenToastUnknownErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Unbekannter Signatur-Token-Fehler. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating signature token toast
 */
export const signatureTokenToastCreateUnknownErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Erstellen des Signatur-Tokens. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Requesting document patches toast
 */
export const documentPatchesToastRequestErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Anfordern von Dokument-Patches. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Downloading document toast
 */
export const documentToastDownloadErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Herunterladen des Dokuments. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating scroll position toast
 */
export const documentScrollPosToastUpdateErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Aktualisieren der Bildlaufposition. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Submit signature toast
 */
export const documentSignatureToastSubmitErr = (options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Ein Fehler ist aufgetreten.',
    description: 'Kann nicht ohne Unterschrift senden.',
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: creating new version of document
 */
export const documentNewVersionToastCreateErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Erstellen einer neuen Version des ausgewählten Dokuments. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating document visible to client
 */
export const documentToastUpdateDocumentVisibleToClientErr = (
  errorCode: string,
  options?: UseToastOptions
): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Beim Aktualisieren der Sichtbarkeit des Dokumentes ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Updating document
 */
export const documentToastUpdateDocumentErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Beim Aktualisieren des Dokuments ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Creating new version document
 */
export const documentToastNewDocumentVersionErr = (errorCode: string, options?: UseToastOptions): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Beim Erstellen einer neuen Version des Dokuments ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
