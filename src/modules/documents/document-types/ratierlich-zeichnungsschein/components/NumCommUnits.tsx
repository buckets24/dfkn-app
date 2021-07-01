import { FormikProps, FormikValues } from 'formik';
import { CurrencyFieldType, CurrencyFormikField, CurrencyPrintField } from 'jexity-app/form/fields/CurrencyField';
import { SpecialFormikContext } from 'jexity-app/form/useFormikByName';
import React, { FC } from 'react';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { useContext } from 'use-context-selector';

interface NumCommUnitsProps extends CurrencyFieldType {
  name: string;
  subscriptionFieldName: string;
  billingFieldName: string;
}
export const NumCommUnits: FC<NumCommUnitsProps> = ({ name, subscriptionFieldName, billingFieldName, ...others }) => {
  const { values } = useContext(SpecialFormikContext) as FormikProps<FormikValues>;

  let commUnits: number | undefined;
  if (values[subscriptionFieldName] && values[billingFieldName]) {
    commUnits = parseFloat(values[subscriptionFieldName]) / parseFloat(values[billingFieldName]);
  }

  return (
    <PrintableField<CurrencyFieldType>
      EditComponent={CurrencyFormikField}
      PrintComponent={CurrencyPrintField}
      key={name}
      name={name}
      label="Einheiten"
      variant="flushed"
      value={commUnits ? Math.round(commUnits * 1000) / 1000 : ''}
      showRequiredIcon={false}
      symbol={false}
      disabled
      {...others}
    />
  );
};
