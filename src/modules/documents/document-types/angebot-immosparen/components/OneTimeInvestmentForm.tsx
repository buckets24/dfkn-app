import { FC } from 'react';
import { Grid, Flex, Text } from '@chakra-ui/react';
import { SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { yearsDurationOptions } from '../schema';
import { CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { defaultTaxRate } from '../utils';

export const OneTimeInvestmentForm: FC = () => {
  const { printMode } = useDocFormMeta();
  const { value: investmentValue, setFieldValue } = useFormikByName('investmentAmount');
  const { value: considerTaxAllowance } = useFormikByName('considerTaxAllowance');
  const { value: considerAgioPayments } = useFormikByName('considerAgioPayments');

  return (
    <>
      <Grid templateColumns="1fr 1fr " gap={printMode ? 5 : 10} mb={10}>
        <Flex alignItems="center">
          <Text mr={3} color="documents.secondary.700" fontWeight={500}>
            Anlagesumme
          </Text>
          <CurrencyFormikField
            minW="100px"
            w="100%"
            variant="dotted-flush"
            key="investmentAmount"
            name="investmentAmount"
            showRequiredIcon={false}
            onBlur={() => {
              setFieldValue?.('investmentAmount', Math.round(investmentValue / 10) * 10);
            }}
          />
        </Flex>
        <Flex mt={printMode ? 0 : -1} alignItems="center">
          <Text mt={printMode ? -3 : 2} mr={3} color="documents.secondary.700" fontWeight={500}>
            Laufzeit
          </Text>
          <SelectFormikField
            variant="dotted-flush"
            key="investmentPeriod"
            name="investmentPeriod"
            options={yearsDurationOptions()}
            errorMessageSpacer={false}
          />
        </Flex>
      </Grid>
      <Grid templateColumns="1fr 1fr " gap={printMode ? 5 : 10} mb={10}>
        <CheckboxFormikField name="considerAgioPayments" label="Agiozahlungen berücksichtigen" />
        {considerAgioPayments && (
          <Flex alignItems="center">
            <Text mt={printMode ? -3 : 2} mr={3} color="documents.secondary.700" fontWeight={500}>
              Agio
            </Text>
            <SelectFormikField
              variant="dotted-flush"
              key="oneTimeInvestmentAgio"
              name="oneTimeInvestmentAgio"
              options={[
                {
                  type: 'formStringOption',
                  key: '1',
                  value: '0.01',
                  label: '1%',
                },
                {
                  type: 'formStringOption',
                  key: '2',
                  value: '0.02',
                  label: '2%',
                },
                {
                  type: 'formStringOption',
                  key: '3',
                  value: '0.03',
                  label: '3%',
                },
                {
                  type: 'formStringOption',
                  key: '4',
                  value: '0.04',
                  label: '4%',
                },
                {
                  type: 'formStringOption',
                  key: '5',
                  value: '0.05',
                  label: '5%',
                },
              ]}
              errorMessageSpacer={false}
            />
          </Flex>
        )}
      </Grid>
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
