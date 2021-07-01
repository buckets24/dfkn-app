import { Button, Heading, Text } from '@chakra-ui/react';
import { FormikConfig } from 'formik';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { PasswordFormikField } from 'jexity-app/form/fields/PasswordField';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { FC } from 'react';
import { resetPasswordFormYupSchema } from 'src/modules/common/yupSchemaFields';

export interface ResetPasswordValues {
  email: string;
  verificationCode: string;
  password: string;
  repeatPassword: string;
}

export interface ResetPasswordFormProps {
  email: string | undefined;
  onSubmit: FormikConfig<ResetPasswordValues>['onSubmit'];
  heading?: string;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ email, onSubmit, heading }) => {
  return (
    <>
      <Heading as="h2" mb={1} fontSize="xl" fontWeight="bold" letterSpacing="-0.06px">
        {heading ?? 'Passwort vergessen'}
      </Heading>
      <Text mb={5} fontSize="sm" color="gray.700">
        Prüfen Sie Ihr Postfach. Verwenden Sie den Bestätigungscode aus der E-Mail und wählen Sie ein neues Passwort.
      </Text>

      {/* TODO Don't use any as a passed type generic */}
      <SpecialFormikContextProvider<ResetPasswordValues>
        initialValues={{
          email: '',
          password: '',
          repeatPassword: '',
          verificationCode: '',
        }}
        validationSchema={resetPasswordFormYupSchema}
        onSubmit={onSubmit}
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
                  isRequired={true}
                  showRequiredIcon={false}
                  value={email ? email : ''}
                  isDisabled
                />,
                <StringFormikField
                  key="verificationCode"
                  name="verificationCode"
                  label="Bestätigungscode"
                  isRequired={true}
                  showRequiredIcon={false}
                />,
                <PasswordFormikField
                  key="password"
                  name="password"
                  label="Passwort"
                  isRequired={true}
                  showRequiredIcon={false}
                />,
                <PasswordFormikField
                  key="repeatPassword"
                  name="repeatPassword"
                  label="Passwort wiederholen"
                  isRequired={true}
                  showRequiredIcon={false}
                  disabled={!!props.errors.password || !props.values.password}
                />,
              ]}
            />
            <Button
              type="submit"
              isLoading={props.isSubmitting}
              mt={5}
              mb={8}
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
              isDisabled={!props.values.password || !props.isValid}
            >
              Übernehmen
            </Button>
          </form>
        )}
      </SpecialFormikContextProvider>
    </>
  );
};
