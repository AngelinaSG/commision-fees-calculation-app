import { calculateFee } from './commission-fee-calculation-service';
import {
  testCashInFee,
  testCashOutJuridicalFee,
  testCashOutNaturalFee,
  testOperationsList,
} from '../../dummy-data/dummy-data';

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
});
