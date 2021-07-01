import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const doc001Schema: SpecifiedField[] = [
  // 1st Page
  {
    type: 'stringFormField',
    name: 'placeAndDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'draftsmanSignature',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'firstName',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'identitiyCardOrPassport',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'lastName',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'dateOfExpiry',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'issuingAuthority',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'title',
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
    type: 'emailFormField',
    name: 'email',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'postCodeTown',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'job',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'country',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'residentTaxOffice',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'birthplace',
    isRequired: true,
  },
  {
    type: 'dateFormField',
    name: 'birthday',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'taxId',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'nationality',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'taxNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'bank',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'blz',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'iban',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'bankAccountNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'bic',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'accountOwner',
    isRequired: true,
  },
  // End of 1st Page

  // 2nd Page
  {
    type: 'stringFormField',
    name: 'bondsNumber',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'euroBonds',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'euroBondsInWord',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'totalSubsInEuro',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'totalSubsInWords',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'agio',
    isRequired: true,
    options: [
      { key: '1', label: 'Das Agio zahle ich in einer Summe', value: 'Das Agio zahle ich in einer Summe' },
      { key: '2', label: 'Das Agio zahle ich in gleichen Raten', value: 'Das Agio zahle ich in gleichen Raten' },
      {
        key: '3',
        label: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 50 % verrechnet werden',
        value: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 50 % verrechnet werden',
      },
      {
        key: '4',
        label: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 100 % verrechnet werden',
        value: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 100 % verrechnet werden',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'agioNote',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'latePaymentPlaceAndDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'latePaymentDraftsmanSignature',
    isRequired: true,
  },
  // End of 2nd Page

  // 3rd Page
  {
    type: 'stringFormField',
    name: 'businessPremises',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'rightOfWithdrawalPlaceAndDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'rightOfWithdrawalDraftsmanSignature',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'drawingAcceptedPlaceAndDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'drawingAcceptedManagingDirectorSignature',
    isRequired: true,
  },
  // End of 3rd Page
];
