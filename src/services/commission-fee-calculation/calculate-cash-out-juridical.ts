import { ICashOutJuridicalFee } from 'types/types';

export const calculateCashOutJuridical = (
  operationAmount: number,
  cashOutJuridicalFee: ICashOutJuridicalFee,
) => {
  const {
    percents,
    min: { amount: minAmount },
  } = cashOutJuridicalFee;

  const fee = (operationAmount * percents) / 100;

  return fee < minAmount ? minAmount : fee;
};
