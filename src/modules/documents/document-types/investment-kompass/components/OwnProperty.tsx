import { Box, Flex, Grid, Radio, RadioGroup, RadioGroupProps, Text, useMultiStyleConfig } from '@chakra-ui/react';
import { CurrencyFieldType, CurrencyFormikField, CurrencyPrintField } from 'jexity-app/form/fields/CurrencyField';
import { DateFieldType, DateFormikField } from 'jexity-app/form/fields/DateField';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { StringFieldType } from 'jexity-app/form/fields/StringField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import React, { FC, useCallback } from 'react';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DottedFlushedCurrencyPrintField } from './DottedFlushedCurrencyPrintField';
import { DottedFlushedDatePrintField } from './DottedFlushedDatePrintField';

const propertyInfo = [
  {
    text: 'Wohnfläche',
    name: 'ownPropertyLivingSpace',
    unit: 'm²',
  },
  {
    text: 'Kaltmiete',
    name: 'ownPropertyColdRent',
    unit: '€',
  },
  {
    text: 'Nebenkosten',
    name: 'ownPropertyAdditionalCost',
    unit: '€',
  },
];

export const OwnProperty: FC = () => {
  const { printMode } = useDocFormMeta();

  const { value, touch, error, onBlur, setFieldValue } = useFormikByName('ownPropertyExists');

  const styles = useMultiStyleConfig('Form', {
    size: 'lg',
    variant: 'dotted',
  });

  const radioMemoizedOnChange = useCallback<NonNullable<RadioGroupProps['onChange']>>(
    (value) => {
      if (setFieldValue) {
        if (value === 'No') {
          setFieldValue('ownPropertySince', undefined);
          setFieldValue('ownPropertyValueApprox', '');
        }
        setFieldValue('ownPropertyExists', value);
      }
    },
    [setFieldValue]
  );

  return (
    <>
      <RadioGroup
        mb={5}
        name="ownPropertyExists"
        value={value ? value.toString() : ''}
        onChange={radioMemoizedOnChange}
        onBlur={onBlur}
      >
        <Grid templateColumns="repeat(3, max-content)" gap={5} mb={4}>
          <Flex>
            <Flex alignItems="center">
              <Radio mr={1} value="Yes" variant="dotted" sx={styles.formRadio} isInvalid={!!(touch && error)} />
              <Text
                color="documents.secondary.700"
                fontSize={printMode ? 'sm' : 'md'}
                fontFamily="mono"
                fontWeight={500}
                whiteSpace="nowrap"
              >
                Ja, seit
              </Text>
            </Flex>

            <PrintableField<DateFieldType & StringFieldType>
              EditComponent={DateFormikField}
              PrintComponent={DottedFlushedDatePrintField}
              minW="150px"
              w="100%"
              ml={2}
              variant="dotted-flush"
              key="ownPropertySince"
              name="ownPropertySince"
              showRequiredIcon={false}
              errorMessageSpacer={false}
            />
          </Flex>
          <Flex alignItems="center" mr={2}>
            <Text
              color="documents.secondary.700"
              fontSize={printMode ? 'sm' : 'md'}
              fontFamily="mono"
              fontWeight={500}
              whiteSpace="nowrap"
            >
              Wert ca.
            </Text>
            <PrintableField<CurrencyFieldType>
              EditComponent={CurrencyFormikField}
              PrintComponent={DottedFlushedCurrencyPrintField}
              minW="150px"
              w="100%"
              ml={2}
              variant="dotted-flush"
              key="ownPropertyValueApprox"
              name="ownPropertyValueApprox"
              showRequiredIcon={false}
            />
          </Flex>
          <Flex alignItems="center" mr={2}>
            <Radio mr={1} mb={1} value="No" variant="dotted" sx={styles.formRadio} isInvalid={!!(touch && error)} />
            <Text color="documents.secondary.700" fontSize={printMode ? 'sm' : 'md'} fontFamily="mono" fontWeight={500}>
              Nein
            </Text>
          </Flex>
        </Grid>
        {value === 'Yes' && (
          <Grid mb={10} templateColumns="repeat(2, max-content)" gap={10}>
            <Box>
              {propertyInfo.map((info) => (
                <Flex
                  key={info.name}
                  alignItems="center"
                  color="documents.secondary.700"
                  fontSize={printMode ? 'sm' : 'md'}
                  fontWeight={500}
                >
                  <Text minW="125px" fontFamily="mono">
                    {info.text}:
                  </Text>
                  <PrintableField<CurrencyFieldType>
                    EditComponent={CurrencyFormikField}
                    PrintComponent={CurrencyPrintField}
                    symbol={false}
                    minW="135px"
                    w="100%"
                    variant="dotted-flush"
                    key={info.name}
                    name={info.name}
                    showRequiredIcon={false}
                  />
                  <Text>{info.unit}</Text>
                </Flex>
              ))}
            </Box>
            <Box>
              <RadioFormikField
                mt={2}
                mb={printMode ? 5 : 10}
                variant="dotted"
                key="ownPropertyType"
                name="ownPropertyType"
                direction="row"
                options={[
                  { key: '1', label: 'ETW', value: 'ETW' },
                  { key: '2', label: 'EFH', value: 'EFH' },
                  { key: '3', label: 'DHH', value: 'DHH' },
                  { key: '4', label: 'RHH', value: 'RHH' },
                ]}
                isRequired
                dottedShowLabel
              />
              <RadioFormikField
                variant="dotted"
                key="ownPropertyUsageType"
                name="ownPropertyUsageType"
                direction="row"
                justifyContent="space-between"
                options={[
                  { key: '1', label: 'Selbstnutzung', value: 'Selbstnutzung' },
                  { key: '2', label: 'Vermietung', value: 'Vermietung' },
                ]}
                isRequired
                dottedShowLabel
              />
            </Box>
          </Grid>
        )}
      </RadioGroup>
    </>
  );
};
