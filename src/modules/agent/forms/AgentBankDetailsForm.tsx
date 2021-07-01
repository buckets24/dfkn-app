import { Box, BoxProps, Heading } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import React, { FC } from 'react';

export const AgentBankDetailsForm: FC<BoxProps> = ({ ...other }) => {
  return (
    <Card {...other}>
      <Heading as="h3" size="md" p={6} pb={3} fontFamily="body">
        Bankinformationen
      </Heading>
      <Box>
        <SpecialFormikContextProvider
          initialValues={{}}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit} noValidate>
              <FormGridLayout
                p={6}
                columns={[1, null, null, 2]}
                spacingX={5}
                spacingY={5}
                fields={[
                  <StringFormikField
                    key="bank"
                    name="bank"
                    label="Bank"
                    isRequired={true}
                    maxW={['100%', null, '400px']}
                  />,
                  [],
                  [
                    <StringFormikField
                      key="iban"
                      name="iban"
                      label="IBAN"
                      isRequired={true}
                      minW={['100%', null, '400px']}
                    />,
                    <StringFormikField
                      key="bic"
                      name="bic"
                      label="BIC"
                      isRequired={true}
                      minW={['100%', null, '180px']}
                    />,
                  ],
                ]}
              />
            </form>
          )}
        </SpecialFormikContextProvider>
      </Box>
    </Card>
  );
};
