import { Text } from '@chakra-ui/react';
import { FormikProps, FormikValues } from 'formik';
import { CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { SpecialFormikContext } from 'jexity-app/form/useFormikByName';
import React, { FC } from 'react';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { useContext } from 'use-context-selector';

export const SpendingBudget: FC = () => {
  const { values } = useContext(SpecialFormikContext) as FormikProps<FormikValues>;
  const { printMode } = useDocFormMeta();
  const spendingBudget =
    parseFloat(values.totalRevenue) - parseFloat(values.totalFixedExpenses) - parseFloat(values.totalSavings);

  return (
    <>
      <CurrencyFormikField
        maxW="120px"
        variant="dotted"
        key="totalRevenue"
        name="totalRevenue"
        label="Einnahmen gesamt"
        showRequiredIcon={false}
        type="number"
        isRequired
      />
      <Text mt={printMode ? 3 : 6} mx={5} fontWeight="bold">
        -
      </Text>
      <CurrencyFormikField
        maxW="120px"
        variant="dotted"
        key="totalFixedExpenses"
        name="totalFixedExpenses"
        label="Fixe Ausgaben gesamt"
        showRequiredIcon={false}
        isRequired
        type="number"
      />
      <Text mt={printMode ? 3 : 6} mx={5} fontWeight="bold">
        -
      </Text>
      <CurrencyFormikField
        maxW="120px"
        variant="dotted"
        key="totalSavings"
        name="totalSavings"
        label="Sparen gesamt "
        showRequiredIcon={false}
        isRequired
        type="number"
      />
      <Text mt={printMode ? 3 : 6} mx={5} fontWeight="bold">
        =
      </Text>
      <CurrencyFormikField
        variant="dotted"
        key="variableSpendingBudget"
        name="variableSpendingBudget"
        value={spendingBudget ? Math.round(spendingBudget * 1000) / 1000 : ''}
        label="Budget für variable Ausgaben"
        showRequiredIcon={false}
        isReadOnly
      />
    </>
  );
};
