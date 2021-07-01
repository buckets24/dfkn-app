import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const rbsScheinDFKHomeSchema: SpecifiedField[] = [
  // 1st Page
  {
    type: 'radioFormField',
    name: 'salutation',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Frau',
        value: 'Frau',
      },
      {
        key: '2',
        label: 'Herr',
        value: 'Herr',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'title',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'streetNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'lastName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'firstName',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'sellingPrice',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'birthday',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'nettCommissionPercent',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'streetHouseNumber',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'commissionAmountIn100',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'postCode',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'place',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'commissionAmountIn45',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'commUnits',
    isRequired: true,
  },
  // End of 1st Page
];
