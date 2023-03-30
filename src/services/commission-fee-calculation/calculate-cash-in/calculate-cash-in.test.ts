import { calculateCashIn } from './calculate-cash-in';
import { testCashInFee } from '../../../dummy-data/dummy-data';

test('Calculate cash in', () => {
  expect(calculateCashIn(200, testCashInFee)).toBe(0.06);
});
