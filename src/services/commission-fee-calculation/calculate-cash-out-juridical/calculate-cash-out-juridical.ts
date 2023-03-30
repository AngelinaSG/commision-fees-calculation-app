import { ICashOutJuridicalFee } from 'types/types';
import { NumberHelper } from '../../../utils/number-helper';

export const calculateCashOutJuridical = (
  operationAmount: number,
  cashOutJuridicalFee: ICashOutJuridicalFee,
) => {
  const { calculatePercentage } = NumberHelper;

  const {
    percents,
    min: { amount: minAmount },
  } = cashOutJuridicalFee;

  const fee = calculatePercentage(operationAmount, percents);

  return fee < minAmount ? minAmount : fee;
};
