import { Box, BoxProps, InputProps } from '@chakra-ui/react';
import { DateFieldType, DateFormikField } from 'jexity-app/form/fields/DateField';
import { SelectFieldType, SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { StringFieldType, StringFormikField } from 'jexity-app/form/fields/StringField';
import React, { FC } from 'react';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { GhostDatePrintField } from './GhostDatePrintField';
import { GhostStringPrintField } from './GhostStringPrintFIeld';

const borderStyle: BoxProps = {
  borderWidth: '1px',
  borderColor: 'documents.secondary.700',
};

const tdProps: BoxProps = {
  as: 'td',
  fontWeight: 500,
  textAlign: 'center',
  borderStyle: 'dotted',
  ...borderStyle,
};

const inputProps: InputProps = {
  // p: 0,
};

export const PersonalDataTableRow: FC<{ index: number }> = ({ index }) => {
  return (
    <Box key={index} as="tr" borderStyle="dotted" {...borderStyle}>
      <Box {...tdProps}>
        <PrintableField<StringFieldType>
          EditComponent={StringFormikField}
          PrintComponent={GhostStringPrintField}
          variant="ghost"
          key={index === 0 ? 'title' : `contractorTitle`}
          name={index === 0 ? 'title' : `contractorTitle`}
          minW="80px"
          inputProps={inputProps}
        />
      </Box>
      <Box {...tdProps}>
        <PrintableField<StringFieldType>
          EditComponent={StringFormikField}
          PrintComponent={GhostStringPrintField}
          variant="ghost"
          key={index === 0 ? 'firstName' : `contractorFirstName`}
          name={index === 0 ? 'firstName' : `contractorFirstName`}
          minW="80px"
          inputProps={inputProps}
        />
      </Box>
      <Box {...tdProps}>
        <PrintableField<StringFieldType>
          EditComponent={StringFormikField}
          PrintComponent={GhostStringPrintField}
          variant="ghost"
          key={index === 0 ? 'lastName' : `contractorLastName`}
          name={index === 0 ? 'lastName' : `contractorLastName`}
          minW="80px"
          inputProps={inputProps}
        />
      </Box>
      <Box {...tdProps}>
        <PrintableField<DateFieldType>
          EditComponent={DateFormikField}
          PrintComponent={GhostDatePrintField}
          variant="ghost"
          key={index === 0 ? 'birthday' : `contractorBirthDate`}
          name={index === 0 ? 'birthday' : `contractorBirthDate`}
          w="105px"
          errorMessageSpacer={false}
          inputProps={inputProps}
          disableFutureDates
        />
      </Box>
      <Box {...tdProps}>
        <PrintableField<StringFieldType>
          EditComponent={StringFormikField}
          PrintComponent={GhostStringPrintField}
          variant="ghost"
          key={index === 0 ? 'birthPlace' : `contractorBirthPlace`}
          name={index === 0 ? 'birthPlace' : `contractorBirthPlace`}
          minW="80px"
          inputProps={inputProps}
        />
      </Box>
      <Box {...tdProps}>
        <PrintableField<SelectFieldType>
          EditComponent={SelectFormikField}
          PrintComponent={GhostStringPrintField}
          variant="ghost"
          key={index === 0 ? 'maritalStatus' : `contractorMaritalStatus`}
          name={index === 0 ? 'maritalStatus' : `contractorMaritalStatus`}
          minW="80px"
          inputProps={inputProps}
          options={[
            {
              type: 'formStringOption',
              key: 'ledig',
              value: 'ledig',
              label: 'Ledig',
            },
            {
              type: 'formStringOption',
              key: 'verlobt',
              value: 'verlobt',
              label: 'Verlobt',
            },
            {
              type: 'formStringOption',
              key: 'verheiratet',
              value: 'verheiratet',
              label: 'Verheiratet',
            },
            {
              type: 'formStringOption',
              key: 'geschieden',
              value: 'geschieden',
              label: 'Geschieden',
            },
            {
              type: 'formStringOption',
              key: 'verwitwet',
              value: 'verwitwet',
              label: 'Verwitwet',
            },
          ]}
          errorMessageSpacer={false}
        />
      </Box>
      <Box {...tdProps}>
        <PrintableField<StringFieldType>
          EditComponent={StringFormikField}
          PrintComponent={GhostStringPrintField}
          variant="ghost"
          key={index === 0 ? 'nationality' : `contractorNationality`}
          name={index === 0 ? 'nationality' : `contractorNationality`}
          minW="80px"
          inputProps={inputProps}
        />
      </Box>
      <Box {...tdProps}>
        <PrintableField<StringFieldType>
          EditComponent={StringFormikField}
          PrintComponent={GhostStringPrintField}
          variant="ghost"
          key={index === 0 ? 'taxId' : `contractorTaxID`}
          name={index === 0 ? 'taxId' : `contractorTaxID`}
          minW="80px"
          inputProps={inputProps}
        />
      </Box>
    </Box>
  );
};
