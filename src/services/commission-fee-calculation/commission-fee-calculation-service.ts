import { DateHelper } from '../../utils/date-helper';
import {
  OPERATION_TYPE,
  SUPPORTED_CURRENCIES,
  USER_TYPE,
} from '../../constants/constants';
import { NumberHelper } from '../../utils/number-helper';
import {
  ICashInFee,
  ICashOperation,
  ICashOutJuridicalFee,
  ICashOutNaturalFee,
} from 'types/types';
import { calculateCashIn } from './calculate-cash-in/calculate-cash-in';
import { calculateCashOutJuridical } from './calculate-cash-out-juridical/calculate-cash-out-juridical';
import { calculateCashOutNatural } from './calculate-cash-out-natural/calculate-cash-out-natural';

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
      operation: { amount, currency },
    } = operation;

    if (!SUPPORTED_CURRENCIES.includes(currency)) {
      throw new Error(`ERROR: ${currency} is not supported currency`);
    }

    let operationFee;

    const isUserHasTransactionHistory = !!cashOutNaturalHistory[user_id];

    if (isUserHasTransactionHistory) {
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
      operationFee = calculateCashOutNatural({
        operationData: operation,
        cashOutNaturalHistory,
        cashOutNaturalFee,
      });

      cashOutNaturalHistory[user_id] = cashOutNaturalHistory[user_id]
        ? [...cashOutNaturalHistory[user_id], operation]
        : [operation];
    }

    const { roundUp, formatToFixed } = NumberHelper;

    return formatToFixed(roundUp(operationFee), 2);
  });
};
