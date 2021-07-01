import { CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import React, { FC } from 'react';

export const SalaryBenefitRentPension: FC = () => {
  const { value } = useFormikByName('totalRevenue');

  return (
    <CurrencyFormikField
      maxW="240px"
      variant="dotted"
      key="salaryBenefitRentPension"
      name="salaryBenefitRentPension"
      value={value ? value : ''}
      label=""
      showRequiredIcon={false}
      isReadOnly
      type="number"
    />
  );
};
