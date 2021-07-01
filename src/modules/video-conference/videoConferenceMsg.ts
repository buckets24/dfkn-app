import { UseToastOptions } from '@chakra-ui/react';

/**
 * NOTE:
 * Pattern for creating messages would be {module}{category}{service}{messageType}
 */

/**
 * ERROR: Assigning meeting to client video conference toast
 */
export const videoConferenceToastAssigningMeetingErr = (options?: UseToastOptions): UseToastOptions => {
  return {
    status: 'error',
    title: 'Das Meeting ist keinem Kunden zugeordnet',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};

/**
 * ERROR: Requesting meeting video conference toast
 */
export const videoConferenceToastRequestMeetingErr = (
  errorCode: string,
  options?: UseToastOptions
): UseToastOptions => {
  return {
    title: 'Fehler',
    description: `Fehler beim Aktualisieren der Besprechung. (Fehlercode: ${errorCode})`,
    status: 'error',
    duration: 15000,
    isClosable: true,
    ...options,
  };
};
