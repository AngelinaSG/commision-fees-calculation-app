import {
  ICashInFee,
  ICashOperation,
  ICashOutJuridicalFee,
  ICashOutNaturalFee,
} from 'types/types';

export const testCashInFee: ICashInFee = {
  percents: 0.03,
  max: {
    amount: 5,
    currency: 'EUR',
  },
};

export const testCashOutNaturalFee: ICashOutNaturalFee = {
  percents: 0.3,
  week_limit: {
    amount: 1000,
    currency: 'EUR',
  },
};

export const testCashOutJuridicalFee: ICashOutJuridicalFee = {
  percents: 0.3,
  min: {
    amount: 0.5,
    currency: 'EUR',
  },
};

export const testOperationData: ICashOperation = {
  date: '2016-01-10',
  user_id: 3,
  user_type: 'natural',
  type: 'cash_out',
  operation: { amount: 1000.0, currency: 'EUR' },
};

export const testOperationsList: ICashOperation[] = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
  {
    date: '2016-01-06',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 30000, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-01-07',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 100.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_in',
    operation: { amount: 1000000.0, currency: 'EUR' },
  },
  {
    date: '2016-01-10',
    user_id: 3,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 1000.0, currency: 'EUR' },
  },
  {
    date: '2016-02-15',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
];

export const testOperationsListUnsupportedCurrency: ICashOperation[] = [
  {
    date: '2016-01-05',
    user_id: 1,
    user_type: 'natural',
    type: 'cash_in',
    operation: { amount: 200.0, currency: 'UAH' },
  },
  {
    date: '2016-01-06',
    user_id: 2,
    user_type: 'juridical',
    type: 'cash_out',
    operation: { amount: 300.0, currency: 'EUR' },
  },
];
