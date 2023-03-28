import { ICashInFee } from 'types/types';

export const calculateCashIn = (
  operationAmount: number,
  cashInFee: ICashInFee,
) => {
  const {
    percents,
    max: { amount },
  } = cashInFee;
  const fee = (operationAmount * percents) / 100;
  return fee > amount ? amount : fee;
};
