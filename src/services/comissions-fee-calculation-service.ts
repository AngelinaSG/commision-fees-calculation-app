import { DateHelper } from '../utils/date-helper';
import { OPERATION_TYPE, USER_TYPE } from '../constants/constants';
import { RoundingHelper } from '../utils/rounding-helper';
import {ICashInFee, ICashOperation, ICashOutJuridicalFee, ICashOutNaturalFee} from "../types/types";

interface calculateFeeArgsTypes {
  operationsList: ICashOperation[];
  cashInFee: ICashInFee;
  cashOutJuridicalFee: ICashOutJuridicalFee;
  cashOutNaturalFee: ICashOutNaturalFee;
}

export const calculateFee = ({
  operationsList,
  cashInFee,
  cashOutJuridicalFee,
  cashOutNaturalFee,
}: calculateFeeArgsTypes) => {
  let cashOutNaturalHistory = {};

  return operationsList.map((operation) => {
    const {
      date,
      user_id,
      user_type,
      type,
      operation: { amount },
    } = operation;

    let operationFee;

    if (cashOutNaturalHistory[user_id]) {
      const prevOperationDate = cashOutNaturalHistory[user_id].at(-1).date;
      const isSameWeek = DateHelper.isSame({
        firstDate: prevOperationDate,
        secondDate: date,
        unit: 'week',
      });
      if (!isSameWeek) {
        delete cashOutNaturalHistory[user_id];
      }
    }

    if (type === OPERATION_TYPE.CASH_IN) {
      operationFee = calculateCashIn(amount, cashInFee);
    }

    if (type === OPERATION_TYPE.CASH_OUT && user_type === USER_TYPE.JURIDICAL) {
      operationFee = calculateCashOutJuridical(amount, cashOutJuridicalFee);
    }

    if (type === OPERATION_TYPE.CASH_OUT && user_type === USER_TYPE.NATURAL) {
      operationFee = calculateCashOut({
        operationData: operation,
        cashOutNaturalHistory,
        cashOutNaturalFee,
      });
      if (user_type === USER_TYPE.NATURAL) {
        cashOutNaturalHistory[user_id] = cashOutNaturalHistory[user_id]
          ? [...cashOutNaturalHistory[user_id], operation]
          : [operation];
      }
    }

    return RoundingHelper.roundUp(operationFee);
  });
};

export const calculateCashIn = (operationAmount: number, cashInFee: ICashInFee) => {
  const {
    percents,
    max: { amount },
  } = cashInFee;
  const fee = (operationAmount * percents) / 100;
  return fee > amount ? amount : fee;
};

const calculateCashOut = ({
  operationData,
  cashOutNaturalHistory,
  cashOutNaturalFee,
}) => {
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

  if (freeFeeLimitUsageAmount + operationAmount > weekLimitAmount) {
    const taxableAmount =
      freeFeeLimitUsageAmount < weekLimitAmount
        ? freeFeeLimitUsageAmount + operationAmount - weekLimitAmount
        : operationAmount;
    return (taxableAmount * percents) / 100;
  } else if (freeFeeLimitUsageAmount <= weekLimitAmount) {
    return 0;
  }

  return 'Calculation mistake';
};

const calculateCashOutJuridical = (operationAmount, cashOutJuridicalFee) => {
  const {
    percents,
    min: { amount: minAmount },
  } = cashOutJuridicalFee;

  const fee = (Number(operationAmount) * percents) / 100;

  const result = Number(fee.toFixed(2));

  return result < minAmount ? minAmount : result;
};
