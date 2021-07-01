import { SelectFormFieldOption } from "jexity-app/form/fields/fieldApi";

export type PaymentPeriodMultiplierType = {
  monthly: number;
  quarterly: number;
  'half-yearly': number;
  yearly: number;
};

export const paymentPeriodMultiplier: PaymentPeriodMultiplierType = {
  monthly: 1,
  quarterly: 3,
  'half-yearly': 6,
  yearly: 12,
};

export const subscriptionMultiplier: PaymentPeriodMultiplierType = {
  monthly: 12,
  quarterly: 4,
  'half-yearly': 2,
  yearly: 1,
};

export const agioPercentCompleteOptions: SelectFormFieldOption[] = [
  {
    type: 'formStringOption',
    key: 'Agio 0%',
    value: '0',
    label: 'Agio 0%',
  },
  {
    type: 'formStringOption',
    key: 'Agio 1%',
    value: '1',
    label: 'Agio 1%',
  },
  {
    type: 'formStringOption',
    key: 'Agio 2%',
    value: '2',
    label: 'Agio 2%',
  },
  {
    type: 'formStringOption',
    key: 'Agio 3%',
    value: '3',
    label: 'Agio 3%',
  },
  {
    type: 'formStringOption',
    key: 'Agio 4%',
    value: '4',
    label: 'Agio 4%',
  },
  {
    type: 'formStringOption',
    key: 'Agio 5%',
    value: '5',
    label: 'Agio 5%',
  },
];

export const agioPercentWithoutZeroOptions: SelectFormFieldOption[] = agioPercentCompleteOptions.filter((agio)=> agio.value !== '0');

export const proportionalDivider: { [key: string]: { [key: string]: string } } = {
  // Reguläre
  '1000': {
    '0': '1000', // Agio 0%
    '5': '1000', // Agio 5%
    '4': '1200', // Agio 4%
    '3': '1400', // Agio 3%
    '2': '1600', // Agio 2%
    '1': '1800', // Agio 1%
  },
  // Ratierliche 50/50% Verrechnung
  '1200': {
    '0': '1000', // Agio 0%
    '5': '1200', // Agio 5%
    '4': '1400', // Agio 4%
    '3': '1600', // Agio 3%
    '2': '1800', // Agio 2%
    '1': '2000', // Agio 1%
  },
  // Ratierliche 100% Verrechnung
  '1100': {
    '0': '1000', // Agio 0%
    '5': '1100', // Agio 5%
    '4': '1300', // Agio 4%
    '3': '1500', // Agio 3%
    '2': '1700', // Agio 2%
    '1': '1900', // Agio 1%
  },
};

export const oneTimeInvestmentAgio:{ [key: string]: string } = {
  '0': '1000', // Agio 0%
  '1': '900', // Agio 1%,
  '2': '800', // Agio 2%
  '3': '700', // Agio 3%
  '4': '600', // Agio 4%
  '5': '500', // Agio 5%
}

export const personsInvolved = [
  {
    title: 'Vermittler',
    name: 'intermediary',
  },
  {
    title: 'Provisionsempfänger',
    name: 'commissionRecipient',
  },
  {
    title: 'Direktor',
    name: 'director',
  },
  {
    title: 'Office (Kontrolle)',
    name: 'office',
  },
];
