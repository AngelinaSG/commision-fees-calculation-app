import { ICashOperation, ICashOutNaturalFee } from 'types/types';
import { NumberHelper } from '../../../utils/number-helper';

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

  const { calculatePercentage } = NumberHelper;
  const isUserHaveOperations = !!cashOutNaturalHistory[user_id];

  if (!isUserHaveOperations) {
    return operationAmount > weekLimitAmount
      ? calculatePercentage(operationAmount - weekLimitAmount, percents)
      : 0;
  }

  const freeFeeLimitUsageAmount = cashOutNaturalHistory[user_id].reduce(
    (prev, cur) => {
      return prev + cur.operation.amount;
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

    return calculatePercentage(taxableAmount, percents);
  }
};
