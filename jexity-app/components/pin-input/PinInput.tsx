import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { Box, Button, ButtonProps, Heading, Stack, Text } from '@chakra-ui/react';
import PinField, { PinFieldProps } from 'react-pin-field';
import { PinInputStyle } from './PinInputStyle';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { RevertIcon } from 'jexity-app/icons/RevertIcon';
import { SuccessIcon } from 'jexity-app/icons/SuccessIcon';

export interface PinInputProps extends PinFieldProps {
  pinInput: string;
  setPinInput: Dispatch<SetStateAction<string>>;
  isUploaded: boolean;
  isServerError: boolean;
  code: string;
  length: number;
  handleSuccess: () => void;
}

export const PinInput: FC<PinInputProps> = ({
  pinInput,
  setPinInput,
  code,
  length,
  isUploaded,
  isServerError,
  handleSuccess,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);

  const ref = useRef<HTMLInputElement[] | null>(null);

  const props: PinFieldProps = {
    className: `pin-input ${
      isSubmitting && isValid ? 'pin-input-success' : isSubmitting && !isValid ? 'pin-input-error' : null
    }`,
    length: length,
    autoFocus: isValid ? false : true,
    validate: /^[0-9]$/,
    onChange: (code: string) => {
      setIsSubmitting(false);
      setPinInput(code);
    },
    disabled: isValid,
    pattern: '[0-9]*',
  };

  const buttonStyle: ButtonProps = {
    size: 'lg',
    bg: 'brand.primary.500',
    borderRadius: '4px',
    color: 'white',
    fontWeight: 700,
    fontSize: 'sm',
    textTransform: 'uppercase',
    _hover: { bg: 'brand.primary.900' },
  };

  const handleSubmit = () => {
    setIsLoading(true);
    setIsSubmitting(true);
    if (pinInput === code) {
      setIsValid(true);
      handleSuccess();
      setIsSubmitting(false);
    } else {
      setIsValid(false);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    const pinField = ref.current;
    setIsSubmitting(false);
    setIsValid(false);
    setPinInput('');

    if (Array.isArray(pinField) && pinField.length > 0) {
      pinField.forEach((input) => (input.value = ''));
      pinField[0].focus();
    }
  };

  useEffect(() => {
    if (isUploaded) {
      setIsSubmitting(true);
      setIsLoading(false);
    }
  }, [isUploaded]);

  useEffect(() => {
    if (isServerError) {
      setIsLoading(false);
    }
  }, [isServerError]);

  return (
    <Box px={[5, null, null, 0]}>
      {!isServerError ? (
        isValid && isSubmitting ? (
          <Box>
            <SuccessIcon />
            <Text fontFamily="heading" fontWeight={700} color="support.success.500" fontSize="3xl">
              Übermittlung erfolgreich
            </Text>
          </Box>
        ) : (
          <>
            {!isValid && isSubmitting && (
              <Text fontFamily="heading" fontWeight={700} fontSize="lg" color="support.alert.500">
                Falsche Pin
              </Text>
            )}
            <Heading as="h3" mb={5} fontFamily="heading" fontWeight={700} fontSize="xl">
              {!isSubmitting
                ? 'Geben Sie die PIN ein, die unter den QR Code eingeblendet ist.'
                : !isValid && 'Bitte geben Sie die PIN ein, die unter dem QR Code eingeblendet ist'}
            </Heading>
            <Stack direction="row" spacing={5} justifyContent="center">
              <PinInputStyle />
              <PinField ref={ref} type="number" {...props} />
            </Stack>
          </>
        )
      ) : (
        <Heading as="h3" mb={5} fontFamily="heading" fontWeight={700} fontSize="xl">
          Es ist ein Fehler aufgetreten, bitte versuchen Sie es erneut
        </Heading>
      )}

      <Box mt={10}>
        {!isServerError ? (
          !isSubmitting ? (
            <Button
              isLoading={isLoading}
              onClick={handleSubmit}
              isDisabled={pinInput.length !== length}
              {...buttonStyle}
            >
              {!isLoading && <CheckIcon mr={2} mb={1} />}
              Senden
            </Button>
          ) : !isValid ? (
            <Button isLoading={isLoading} onClick={handleReset} {...buttonStyle}>
              {!isLoading && <RevertIcon mr={2} />}
              Senden
            </Button>
          ) : (
            <Text>Sie können jetzt dieses Fenster schließen und Ihre Unterschrift im Dokument überprüfen.</Text>
          )
        ) : (
          <Button onClick={handleReset} {...buttonStyle}>
            <RevertIcon mr={2} />
            Senden
          </Button>
        )}
      </Box>
    </Box>
  );
};
