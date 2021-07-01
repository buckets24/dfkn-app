import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const rbsScheinFullServiceImmobilieSchema: SpecifiedField[] = [
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
    name: 'propertyZip',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'propertyCity',
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
    type: 'stringFormField',
    name: 'propertyStreet',
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
    type: 'currencyFormField',
    name: 'propertyPriceContract',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'dateOfSale',
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
    name: 'propertyPriceSalesOrder',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'propertyNumResidentialUnits',
    isRequired: true,
  },
  {
    type: 'emailFormField',
    name: 'email',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'reservationAmount',
    isRequired: true,
  },
  {
    type: 'checkboxFormField',
    name: 'specifyTotal',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'commDivider',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'commFactor',
    isRequired: true,
    options: [
      {
        key: '1',
        label: '1 (mit DFM finanziert)',
        value: '1',
      },
      {
        key: '2',
        label: '0,95 (ohne DFM)',
        value: '0.95',
      },
    ],
  },
  {
    type: 'currencyFormField',
    name: 'totalNumCommUnits',
    isRequired: true,
  },
  {
    type: 'multilineStringFormField',
    name: 'specialAgreements',
    isRequired: true,
    multirow: true,
  },
  {
    type: 'radioFormField',
    name: 'commPayment',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Mit 100%der Provision mit Verzicht*',
        value: '100',
      },
      {
        key: '2',
        label: 'Mit 50%  der Provision mit Verzicht*',
        value: '50',
      },
    ],
  },
  {
    type: 'checkboxFormField',
    name: 'marketingFond',
    isRequired: true,
  },
  // End of 1st Page
];
