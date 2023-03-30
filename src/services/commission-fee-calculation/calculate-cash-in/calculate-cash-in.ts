import { ICashInFee } from 'types/types';
import { NumberHelper } from '../../../utils/number-helper';

export const calculateCashIn = (
  operationAmount: number,
  cashInFee: ICashInFee,
) => {
  const { calculatePercentage } = NumberHelper;

  const {
    percents,
    max: { amount },
  } = cashInFee;

  const fee = calculatePercentage(operationAmount, percents);
  return fee > amount ? amount : fee;
};
