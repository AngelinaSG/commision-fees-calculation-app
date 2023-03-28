import { CommissionsFeeService } from '../commissions-fee-config-service';
import {
  ICashInFee,
  ICashOutJuridicalFee,
  ICashOutNaturalFee,
} from 'types/types';

export const getCommissionFee = async (): Promise<{
  cashInFee: ICashInFee;
  cashOutJuridicalFee: ICashOutJuridicalFee;
  cashOutNaturalFee: ICashOutNaturalFee;
}> => {
  const initialRequest = [
    CommissionsFeeService.getCashInFee(),
    CommissionsFeeService.getCashOutJuridicalFee(),
    CommissionsFeeService.getCashOutNaturalFee(),
  ] as const;

  const [cashInFee, cashOutJuridicalFee, cashOutNaturalFee] = await Promise.all(
    initialRequest,
  );

  return { cashInFee, cashOutJuridicalFee, cashOutNaturalFee };
};
