import { FC, useEffect } from 'react';
import { Grid, Flex, Text } from '@chakra-ui/react';
import { SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { yearsDurationOptions } from '../schema';
import { CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { defaultTaxRate } from '../utils';

export const InstallmentPlanForm: FC = () => {
  const { printMode } = useDocFormMeta();
  const { value: monthlySavingsValue, setFieldValue } = useFormikByName('monthlySavingsAmount');
  const { value: annualSavingsValue } = useFormikByName('annualSavingsAmount');
  const { value: considerTaxAllowance } = useFormikByName('considerTaxAllowance');
  const { value: considerAgioPayments } = useFormikByName('considerAgioPayments');

  useEffect(() => {
    if (!considerAgioPayments) {
      setFieldValue?.('installmentAgio', undefined);
    }
  }, [considerAgioPayments, setFieldValue]);

  useEffect(() => {
    if (!annualSavingsValue) {
      setFieldValue?.('annualSavingsAmount', 0);
    }
  }, [annualSavingsValue, setFieldValue]);

  return (
    <>
      <Grid templateColumns="1fr 1fr " gap={printMode ? 5 : 10} mb={10}>
        <Flex alignItems="center">
          <Text mr={3} color="documents.secondary.700" fontWeight={500}>
            Einmalanlage
          </Text>
          <CurrencyFormikField
            minW="100px"
            w="100%"
            variant="dotted-flush"
            key="annualSavingsAmount"
            name="annualSavingsAmount"
            showRequiredIcon={false}
            onBlur={() => {
              if (!annualSavingsValue || annualSavingsValue === 0) {
                setFieldValue?.('annualSavingsAmount', 0);
              }

              if (annualSavingsValue <= 500 && annualSavingsValue >= 1) {
                setFieldValue?.('annualSavingsAmount', 500);
              }

              if (annualSavingsValue > 500) {
                setFieldValue?.('annualSavingsAmount', Math.round(annualSavingsValue / 10) * 10);
              }
            }}
          />
        </Flex>
        <Flex mt={-1} alignItems="center">
          <Text mt={printMode ? -3 : 2} mr={3} color="documents.secondary.700" fontWeight={500}>
            Einzahlungsdauer
          </Text>
          <SelectFormikField
            variant="dotted-flush"
            key="investmentPeriod"
            name="investmentPeriod"
            options={yearsDurationOptions()}
            errorMessageSpacer={false}
          />
        </Flex>
        <Flex alignItems="center">
          <Text mr={3} color="documents.secondary.700" fontWeight={500}>
            Monatlicher Sparbetrag
          </Text>
          <CurrencyFormikField
            minW="100px"
            w="100%"
            variant="dotted-flush"
            key="monthlySavingsAmount"
            name="monthlySavingsAmount"
            showRequiredIcon={false}
            onBlur={() => {
              setFieldValue?.('monthlySavingsAmount', Math.round(monthlySavingsValue / 10) * 10);
            }}
          />
        </Flex>
        {considerAgioPayments && (
          <Flex alignItems="center">
            <Text mt={printMode ? -3 : 2} mr={3} color="documents.secondary.700" fontWeight={500}>
              Agio
            </Text>
            <SelectFormikField
              variant="dotted-flush"
              key="installmentAgio"
              name="installmentAgio"
              options={[
                {
                  type: 'formStringOption',
                  key: '1',
                  value: '5% in einer Summe',
                  label: '5% in einer Summe',
                },
                {
                  type: 'formStringOption',
                  key: '2',
                  value: '5% in 3 gleichen Raten',
                  label: '5% in 3 gleichen Raten',
                },
                {
                  type: 'formStringOption',
                  key: '3',
                  value: '5%, 50% Verrechnung',
                  label: '5%, 50% Verrechnung',
                },
                {
                  type: 'formStringOption',
                  key: '4',
                  value: '5%, 100% Verrechnung',
                  label: '5%, 100% Verrechnung',
                },
              ]}
              errorMessageSpacer={false}
            />
          </Flex>
        )}
      </Grid>
      <CheckboxFormikField mb={10} label="Agiozahlungen berücksichtigen" name="considerAgioPayments" />
      <CheckboxFormikField
        mb={printMode ? 0 : 5}
        name="considerTaxAllowance"
        label="Steuerfreibetrag berücksichtigen"
      />
      <Grid templateColumns="1fr 1fr " gap={printMode ? 5 : 10} mb={considerTaxAllowance && 10}>
        {considerTaxAllowance && (
          <>
            <Flex alignItems="center">
              <Text mr={3} color="documents.secondary.700" fontWeight={500}>
                Steuersatz
              </Text>
              <CurrencyFormikField
                minW="100px"
                w="100%"
                variant="dotted-flush"
                key="taxRate"
                name="taxRate"
                value={defaultTaxRate}
                showRequiredIcon={false}
                symbol={false}
              />
              <Text mr={3} color="documents.secondary.700" fontWeight={500}>
                %
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Text mr={3} color="documents.secondary.700" fontWeight={500}>
                Jährlicher Steuerfreibetrag
              </Text>
              <CurrencyFormikField
                minW="100px"
                w="100%"
                variant="dotted-flush"
                key="annualTaxAllowance"
                name="annualTaxAllowance"
                showRequiredIcon={false}
                value={801}
              />
            </Flex>
          </>
        )}
      </Grid>
    </>
  );
};
