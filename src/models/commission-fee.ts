import { CommissionsFeeService } from '../services/commisions-fee-config-service';

export const getCommissionFee = async () => {
  const initialRequest = [
    await CommissionsFeeService.getCashInFee(),
    await CommissionsFeeService.getCashOutJuridicalFee(),
    await CommissionsFeeService.getCashOutNaturalFee(),
  ];

  const [cashInFee, cashOutJuridicalFee, cashOutNaturalFee] = await Promise.all(
    initialRequest,
  );

  return { cashInFee, cashOutJuridicalFee, cashOutNaturalFee };
};
