import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const rbsScheinSchema: SpecifiedField[] = [
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
    name: 'firstName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'road',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'houseNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'surName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'plz',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'ort',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'dateOfBirth',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'telephone',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'investmentType',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Ratierliche Anlage',
        value: 'ratiosInvestment',
      },
      {
        key: '2',
        label: 'Einmalanlage',
        value: 'singleInvestment',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'rateableBegin',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'singleBegin',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'paymentPeriod',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'contribution',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'agioPercent',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'rateableSubscriptionAmount',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'singleSubscriptionAmount',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'rateablePaymentMethod',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Monatlich',
        value: 'monthly',
      },
      {
        key: '2',
        label: 'Vierteljährlich',
        value: 'quarterly',
      },
      {
        key: '3',
        label: 'Vierteljährlich',
        value: 'yearly',
      },
    ],
  },
  {
    type: 'radioFormField',
    name: 'singlePaymentMethod',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Einmalig',
        value: 'unique',
      },
      {
        key: '2',
        label: 'Ratierlich',
        value: 'advisable%',
      },
    ],
  },
  {
    type: 'radioFormField',
    name: 'premiumPayments',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Teiler 1000',
        value: 'Teiler 1000',
      },
      {
        key: '2',
        label: 'Teiler 1200 50/50%',
        value: 'Teiler 1200 50/50%',
      },
      {
        key: '3',
        label: 'Teiler 1100 100%',
        value: 'Teiler 1100 100%',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'investmentAmount',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'numberOfInstallments',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'agio',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Agio 0% Teiler 1000',
        value: 'Agio 0% Teiler 1000',
      },
      {
        key: '2',
        label: 'Agio 1% Teiler 900',
        value: 'Agio 1% Teiler 900',
      },
      {
        key: '3',
        label: 'Agio 2% Teiler 800',
        value: 'Agio 2% Teiler 800',
      },
      {
        key: '4',
        label: 'Agio 3% Teiler 700',
        value: 'Agio 3% Teiler 700',
      },
      {
        key: '5',
        label: 'Agio 4% Teiler 600',
        value: 'Agio 4% Teiler 600',
      },
      {
        key: '6',
        label: 'Agio 5% Teiler 500',
        value: 'Agio 5% Teiler 500',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'comment',
    isRequired: true,
  },
  {
    type: 'checkboxFormField',
    name: 'marketingFond',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'intermediaryName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'intermediaryNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'intermediaryPower',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'intermediaryDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'intermediarySignature',
    isRequired: true,
  },

  {
    type: 'stringFormField',
    name: 'commissionRecipientName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'commissionRecipientNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'commissionRecipientPower',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'commissionRecipientDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'commissionRecipientSignature',
    isRequired: true,
  },

  {
    type: 'stringFormField',
    name: 'directorName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'directorNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'directorPower',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'directorDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'directorSignature',
    isRequired: true,
  },

  {
    type: 'stringFormField',
    name: 'officeName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'officeNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'officePower',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'officeDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'officeSignature',
    isRequired: true,
  },
  // End of 1st Page
];
