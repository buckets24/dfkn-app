import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const doc003Schema: SpecifiedField[] = [
  // 1st Page
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
    type: 'radioFormField',
    name: 'economicInterest',
    isRequired: true,
    options: [
      {
        key: '1',
        label:
          'Ich bestätige, dass ich auf eigene Rechnung, im eigenen wirtschaftlichen Interesse und nicht auf fremde  Veranlassung handle',
        value:
          'Ich bestätige, dass ich auf eigene Rechnung, im eigenen wirtschaftlichen Interesse und nicht auf fremde  Veranlassung handle',
      },
      { key: '2', label: 'Wirtschaftlich Berechtigter ist*)', value: 'Wirtschaftlich Berechtigter ist*)' },
    ],
  },
  {
    type: 'stringFormField',
    name: 'beneficialOwner',
    isRequired: true,
  },
  {
    type: 'radioFormField',
    name: 'beneficialOwnerStatus',
    isRequired: true,
    options: [
      {
        key: '1',
        label:
          'keine politisch exponierte Person, kein unmittelbares Familienmitglied einer politisch exponierten Person und keine einer politisch exponierten Person nahestehende Person.',
        value:
          'keine politisch exponierte Person, kein unmittelbares Familienmitglied einer politisch exponierten Person und keine einer politisch exponierten Person nahestehende Person.',
      },
      {
        key: '2',
        label:
          'eine politisch exponierte Person, die ihr wichtiges öffentliches Amt im Inland oder als im Inland gewählte Abgeordnete des Europäischen Parlaments ausübt oder die ihr wichtiges öffentliches Amt seit einem Jahr nicht mehr ausgeübt hat, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person nahestehende Person.',
        value:
          'eine politisch exponierte Person, die ihr wichtiges öffentliches Amt im Inland oder als im Inland gewählte Abgeordnete des Europäischen Parlaments ausübt oder die ihr wichtiges öffentliches Amt seit einem Jahr nicht mehr ausgeübt hat, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person nahestehende Person.',
      },
      {
        key: '3',
        label:
          'eine sonstige politisch exponierte Person, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person naheste-hende Person.',
        value:
          'eine sonstige politisch exponierte Person, ein unmittelbares Familienmitglied einer solchen politisch exponierten Person oder eine einer solchen politisch exponierten Person naheste-hende Person.',
      },
    ],
  },
  {
    type: 'stringFormField',
    name: 'politicallyExposedPerson',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'fundsOrigin',
    isRequired: true,
  },
  {
    type: 'stringFormField',
    name: 'placeAndDate',
    isRequired: true,
  },
  {
    type: 'signatureFormField',
    name: 'moneyLaunderingSignature',
    isRequired: true,
  },
  // End of 1st Page
];
