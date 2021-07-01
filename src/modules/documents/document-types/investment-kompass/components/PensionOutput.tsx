import { FormikProps, FormikValues } from 'formik';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import { SpecialFormikContext } from 'jexity-app/form/useFormikByName';
import React, { FC } from 'react';
import { useContext } from 'use-context-selector';

export const PensionOutput: FC = () => {
  const { values } = useContext(SpecialFormikContext) as FormikProps<FormikValues>;

  let pension: number | undefined;
  if (values.grossSalary && values.workingYears) {
    pension = (parseFloat(values.grossSalary) / 100) * parseFloat(values.workingYears);
  }

  return (
    <StringFormikField
      maxW="180px"
      variant="dotted"
      key="amountOfPension"
      name="amountOfPension"
      label="Höhe der Rente"
      value={pension ? Math.round(pension * 1000) / 1000 : ''}
      showRequiredIcon={false}
      isReadOnly
    />
  );
};
