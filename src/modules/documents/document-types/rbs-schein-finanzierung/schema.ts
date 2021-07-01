import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const rbsScheinFinanzierungSchema: SpecifiedField[] = [
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
    name: 'commissionRateInPercentage',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'birthday',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'commissionAmountinEuro',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'streetHouseNumber',
    isRequired: true,
  },
  {
    type: 'currencyFormField',
    name: 'loanCreaditAmountInHigh',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'postCodeTown',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'bankPartner',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'divider',
    isRequired: true,
    options: [
      {
        key: '1',
        label: 'Finanzierung OHNE Finanzierungsberater - 65',
        value: '65',
      },
      {
        key: '2',
        label: 'Finanzierung MIT Finanzierungsberater - 100',
        value: '100',
      },
    ],
  },
  {
    type: 'checkboxFormField',
    name: 'marketFundPerUnit',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'intermediaryLastName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'intermediaryFirstName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'intermediaryEmployeeNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'intermediaryOffice',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'financialAdvisorLastName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'financialAdvisorFirstName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'financialAdvisorEmployeeNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'datePlace1',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'employeeSignature',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'datePlace2',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'directorSignature',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'datePlace3',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'advisorSignature',
    isRequired: true,
  },
  // End of 1st Page
];
