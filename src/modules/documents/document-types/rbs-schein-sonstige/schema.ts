import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const rbsScheinSonstigeSchema: SpecifiedField[] = [
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
    name: 'lastName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'firstName',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'birthday',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'streetHouseNumber',
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
    type: 'stringFormField',
    name: 'description1',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'description2',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'description3',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'description4',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'description5',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'telephone',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'employmentStatus',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Selbstständig',
        value: 'Self-employed',
      },
      {
        key: '2',
        label: 'Angestell',
        value: 'Employed',
      },
    ],
  },
  {
    type: 'radioFormField',
    name: 'commissionRegulation',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Vordiskontierung',
        value: 'Pre-discounting',
      },
      {
        key: '2',
        label: 'Ratierlich',
        value: 'Advisable',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'telephone',
    isRequired: true,
  },
  // End of 1st Page
];
