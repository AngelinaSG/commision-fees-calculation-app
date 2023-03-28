import {
  ICashInFee,
  ICashOperation,
  ICashOutJuridicalFee,
  ICashOutNaturalFee,
} from 'types/types';
import { calculateCashIn } from './calculate-cash-in';
import { calculateCashOutNatural } from './calculate-cash-out-natural';
import { calculateCashOutJuridical } from './calculate-cash-out-juridical';
import { calculateFee } from './commission-fee-calculation-service';

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

const testOperationData: ICashOperation = {
  date: '2016-01-10',
  user_id: 3,
  user_type: 'natural',
  type: 'cash_out',
  operation: { amount: 1000.0, currency: 'EUR' },
};

const testOperationsList: ICashOperation[] = [
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

describe('Commission fee calculation service', () => {
  test('Calculate fee', () => {
    expect(
      calculateFee({
        operationsList: testOperationsList,
        cashInFee: testCashInFee,
        cashOutNaturalFee: testCashOutNaturalFee,
        cashOutJuridicalFee: testCashOutJuridicalFee,
      }),
    ).toStrictEqual([
      '0.06',
      '0.90',
      '87.00',
      '3.00',
      '0.30',
      '0.30',
      '5.00',
      '0.00',
      '0.00',
    ]);
  });

  test('Calculate cash in', () => {
    expect(calculateCashIn(200, testCashInFee)).toBe(0.06);
  });

  test('Calculate cash out natural', () => {
    expect(
      calculateCashOutNatural({
        operationData: testOperationData,
        cashOutNaturalHistory: {},
        cashOutNaturalFee: testCashOutNaturalFee,
      }),
    ).toBe(0);
  });

  test('Calculate cash out juridical', () => {
    expect(calculateCashOutJuridical(200, testCashOutJuridicalFee)).toBe(0.6);
  });
});
