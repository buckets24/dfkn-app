import { SelectFormFieldOption, SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const yearsDurationOptions = (): SelectFormFieldOption[] => {
  const arr: SelectFormFieldOption[] = [];
  for (let i = 5; i <= 25; i++) {
    arr.push({
      type: 'formStringOption',
      key: `${i}`,
      value: `${i}`,
      label: `${i} Jahre`,
    });
  }
  return arr;
};

export const angebotImmosparenDocSchema: SpecifiedField[] = [
  // 3rd Page
  {
    type: 'checkboxFormField',
    name: 'capitalBuilding',
  },
  {
    type: 'checkboxFormField',
    name: 'retirementProvision',
  },
  {
    type: 'checkboxFormField',
    name: 'repaymentTurbo',
  },
  {
    type: 'radioFormField',
    name: 'productPlan',
    isRequired: true,
    options: [
      { key: '1', label: 'Einmalanlage', value: 'oneTimeInvestment' },
      { key: '2', label: 'Ratenanlage', value: 'installment' },
    ],
  },
  {
    type: 'currencyFormField',
    name: 'investmentAmount',
    isRequired: true,
  },
  {
    type: 'selectFormField',
    name: 'investmentPeriod',
    isRequired: true,
    options: yearsDurationOptions(),
  },
  {
    type: 'selectFormField',
    name: 'oneTimeInvestmentAgio',
    isRequired: true,
    options: [
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
    ],
  },
  {
    type: 'checkboxFormField',
    name: 'considerTaxAllowance',
  },
  {
    type: 'currencyFormField',
    name: 'taxRate',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'annualTaxAllowance',
    isRequired: true,
  },
  {
    type: 'checkboxFormField',
    name: 'considerAgioPayments',
  },
  {
    type: 'currencyFormField',
    name: 'monthlySavingsAmount',
    isRequired: true,
  },
  {
    type: 'selectFormField',
    name: 'installmentAgio',
    isRequired: true,
    options: [
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
    ],
  },
  // End of 3rd Page
];
