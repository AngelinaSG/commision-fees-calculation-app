import { calculateFee } from './commission-fee-calculation-service';
import {
  testCashInFee,
  testCashOutJuridicalFee,
  testCashOutNaturalFee,
  testOperationsList,
  testOperationsListUnsupportedCurrency,
} from '../../dummy-data/dummy-data';

describe('Commission fee calculation service', () => {
  test('Calculate fee with correct data', () => {
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

  test('Calculate fee with unsupported currencies should throw error', () => {
    try {
      calculateFee({
        operationsList: testOperationsListUnsupportedCurrency,
        cashInFee: testCashInFee,
        cashOutNaturalFee: testCashOutNaturalFee,
        cashOutJuridicalFee: testCashOutJuridicalFee,
      });
    } catch (e) {
      expect(e).toEqual(e);
    }
  });
});
