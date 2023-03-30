import { calculateCashOutJuridical } from './calculate-cash-out-juridical';
import { testCashOutJuridicalFee } from '../../../dummy-data/dummy-data';

test('Calculate cash out juridical', () => {
  expect(calculateCashOutJuridical(200, testCashOutJuridicalFee)).toBe(0.6);
});
