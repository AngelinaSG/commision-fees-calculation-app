import { calculateCashOutNatural } from './calculate-cash-out-natural';
import {
  testCashOutNaturalFee,
  testOperationData,
} from '../../../dummy-data/dummy-data';

test('Calculate cash out natural', () => {
  expect(
    calculateCashOutNatural({
      operationData: testOperationData,
      cashOutNaturalHistory: {},
      cashOutNaturalFee: testCashOutNaturalFee,
    }),
  ).toBe(0);
});
