import { Dispatch, FC, SetStateAction } from 'react';
import { Button, Heading, Text, useToast } from '@chakra-ui/react';
import { Auth } from 'aws-amplify';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { verifyEmailFormYupSchema } from 'src/modules/common/yupSchemaFields';
import { log, LogLevel } from 'jexity-app/utils/logger';

export interface VerifyEmailFormProps {
  setVerificationCodeSent: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string | undefined>>;
}
export const VerifyEmailForm: FC<VerifyEmailFormProps> = ({ setVerificationCodeSent, setEmail }) => {
  const toast = useToast();

  return (
    <>
      <Heading as="h2" mb={1} fontSize="xl" fontWeight="bold" letterSpacing="-0.06px">
        Passwort vergessen
      </Heading>
      <Text mb={5} fontSize="sm" color="gray.700">
        Geben Sie Ihre E-Mail-Adresse ein und Sie erhalten ein neues Passwort.
      </Text>

      {/* TODO Don't use any as a passed type generic */}
      <SpecialFormikContextProvider<any>
        initialValues={{}}
        validationSchema={verifyEmailFormYupSchema}
        onSubmit={(values, actions) => {
          const { email } = values;
          const { setSubmitting } = actions;
          setEmail(email);

          Auth.forgotPassword(email)
            .then(() => {
              setSubmitting(false);
              setVerificationCodeSent(true);
              log(LogLevel.info, 'FORGOT_PASSWORD_VERIFICATION_CODE', {
                label: 'VerifyEmailForm',
                message: `Verification code sent to the user's email address`,
              });
              toast({
                title: 'Bestätigungscode gesendet',
                description: `Der Bestätigungscode wurde an ${email} gesendet. Bitte überprüfen sie Ihr Postfach.`,
                status: 'success',
                isClosable: true,
              });
              return;
            })
            .catch((e) => {
              if (e.code === 'LimitExceededException') {
                const errorCode = log(LogLevel.error, 'LimitExceededException', {
                  label: 'VerifyEmailForm',
                  ...e,
                });
                toast({
                  title: 'Fehler',
                  description: `Maximale Versuchsanzahl überschritten, bitte versuchen Sie es nach einiger Zeit erneut. (Fehlercode: ${errorCode})`,
                  status: 'error',
                  duration: 15000,
                  isClosable: true,
                });
              } else if (e.code === 'NotAuthorizedException') {
                const errorCode = log(LogLevel.error, 'NotAuthorizedException', {
                  label: 'VerifyEmailForm',
                  ...e,
                });
                toast({
                  title: 'Account noch nicht bestätigt',
                  description: `Ihr Account ist noch nicht bestätigt. Bitte melden Sie sich mit den Zugangsdaten aus der Begrüßungsemail an. (Fehlercode: ${errorCode})`,
                  status: 'error',
                  duration: 15000,
                  isClosable: true,
                });
              } else if (e.code === 'InvalidParameterException') {
                const errorCode = log(LogLevel.error, 'InvalidParameterException', {
                  label: 'VerifyEmailForm',
                  ...e,
                });
                toast({
                  title: 'Zurücksetzten nicht möglich',
                  description: `Das Passwort kann für diese E-Mail nicht zurückgesetzt werden. (Fehlercode: ${errorCode})`,
                  status: 'error',
                  duration: 15000,
                  isClosable: true,
                });
              } else {
                const errorCode = log(LogLevel.error, e, { label: 'VerifyEmailForm', ...e });
                toast({
                  title: 'Fehler',
                  description: `Beim Überprüfen Ihrer E-Mails ist ein Fehler aufgetreten. (Fehlercode: ${errorCode})`,
                  status: 'error',
                  duration: 15000,
                  isClosable: true,
                });
              }
              setSubmitting(false);
              return;
            });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} noValidate>
            <FormGridLayout
              columns={1}
              fields={[
                <EmailFormikField
                  key="email"
                  name="email"
                  label="E-Mail"
                  isDisabled={props.isSubmitting}
                  isRequired={true}
                  showRequiredIcon={false}
                />,
              ]}
            />
            <Button
              type="submit"
              isLoading={props.isSubmitting}
              mt={5}
              mb={5}
              py={6}
              w="100%"
              bg="brand.primary.500"
              borderRadius="4px"
              color="white"
              fontSize="md"
              fontWeight="normal"
              letterSpacing="1.25px"
              _hover={{ bg: 'brand.primary.900' }}
              whiteSpace="pre-wrap"
              isDisabled={!props.values.email || !props.isValid}
            >
              Passwort zurücksetzten
            </Button>
          </form>
        )}
      </SpecialFormikContextProvider>
    </>
  );
};
