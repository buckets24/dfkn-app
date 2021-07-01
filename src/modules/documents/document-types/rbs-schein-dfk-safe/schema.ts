import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const rbsScheinDFKSafeSchema: SpecifiedField[] = [
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
    name: 'job',
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
    type: 'emailFormField',
    name: 'email',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'birthday',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'telephone',
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
  // End of 1st Page
];
