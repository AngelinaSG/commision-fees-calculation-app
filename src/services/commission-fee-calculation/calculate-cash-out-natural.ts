import { ICashOperation, ICashOutNaturalFee } from 'types/types';

interface calculateCashOutNaturalArgs {
  operationData: ICashOperation;
  cashOutNaturalHistory: Record<string, ICashOperation[]>;
  cashOutNaturalFee: ICashOutNaturalFee;
}

export const calculateCashOutNatural = ({
  operationData,
  cashOutNaturalHistory,
  cashOutNaturalFee,
}: calculateCashOutNaturalArgs) => {
  const {
    operation: { amount: operationAmount },
    user_id,
  } = operationData;
  const {
    percents,
    week_limit: { amount: weekLimitAmount },
  } = cashOutNaturalFee;

  const isUserHaveOperations = !!cashOutNaturalHistory[user_id];

  if (!isUserHaveOperations) {
    return operationAmount > weekLimitAmount
      ? ((operationAmount - weekLimitAmount) * percents) / 100
      : 0;
  }

  const freeFeeLimitUsageAmount = cashOutNaturalHistory[user_id].reduce(
    (prev, cur) => {
      return prev + Number(cur.operation.amount);
    },
    0,
  );

  if (freeFeeLimitUsageAmount <= weekLimitAmount) {
    return 0;
  }

  if (freeFeeLimitUsageAmount + operationAmount > weekLimitAmount) {
    const taxableAmount =
      freeFeeLimitUsageAmount < weekLimitAmount
        ? freeFeeLimitUsageAmount + operationAmount - weekLimitAmount
        : operationAmount;
    return (taxableAmount * percents) / 100;
  }
};
