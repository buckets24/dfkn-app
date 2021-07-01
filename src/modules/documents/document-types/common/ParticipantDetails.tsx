import { Box, Flex, Grid } from '@chakra-ui/react';
import React, { FC } from 'react';
import { DateFieldType, DateFormikField } from 'jexity-app/form/fields/DateField';
import { SpecialFormikContext } from 'jexity-app/form/useFormikByName';
import { SignatureIcon } from 'jexity-app/icons/SignatureIcon';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import {
  SignatureFieldType,
  SignatureFormikField,
  SignaturePrintField,
} from 'src/components/signature-field/SignatureField';
import { useContextSelector } from 'use-context-selector';
import { PrintableField } from '../../PrintableField';
import { PrintableText } from '../../PrintableText';
import { useDocFormMeta } from '../../useDocFormMeta';
import { FlushedDatePrintField } from './FlushedDatePrintField';

interface ParticipantDetailsProps {
  personsInvolved: {
    title: string;
    name: string;
  }[];
}

export const ParticipantDetails: FC<ParticipantDetailsProps> = ({ personsInvolved }) => {
  const { printMode } = useDocFormMeta();
  const values = useContextSelector(SpecialFormikContext, (state) => state?.values);
  return (
    <>
      {personsInvolved.map((person, i) => {
        const name = values[`${person.name}Name`];
        const number = values[`${person.name}Number`];
        const power = values[`${person.name}Power`];
        const date = values[`${person.name}Date`];
        const signature = values[`${person.name}Signature`];

        return (
          <Box key={i} mb={printMode ? 1 : 0} _last={{ mb: 0 }}>
            <Flex mb={printMode ? 0 : 2} justifyContent="space-between">
              <PrintableText fontWeight="bold">{person.title}</PrintableText>
            </Flex>
            <Grid templateColumns="repeat(5, 1fr)" gap={3}>
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`${person.name}Name`}
                name={`${person.name}Name`}
                label="Name, Vorname"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                isDisabled={!!signature}
              />
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`${person.name}Number`}
                name={`${person.name}Number`}
                label="Ma Nr."
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                isDisabled={!!signature}
              />
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`${person.name}Power`}
                name={`${person.name}Power`}
                label="Leistung*"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                isDisabled={!!signature}
              />
              <PrintableField<StringFieldType & DateFieldType>
                EditComponent={DateFormikField}
                PrintComponent={FlushedDatePrintField}
                key={`${person.name}Date`}
                name={`${person.name}Date`}
                label="Datum"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                disabled={!!signature}
              />
              <Box>
                <PrintableField<SignatureFieldType>
                  EditComponent={SignatureFormikField}
                  PrintComponent={SignaturePrintField}
                  variant="flushed"
                  key={`${person.name}Signature`}
                  name={`${person.name}Signature`}
                  label="Unterschrift"
                  showRequiredIcon={false}
                  rightIcon={<SignatureIcon mt={3} />}
                  isRequired
                  disabled={!(name && number && power && date) || !!signature}
                />
              </Box>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};
