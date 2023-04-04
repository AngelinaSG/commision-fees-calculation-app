import { BaseHttpServices } from '../config/base-http-services';
import {
  ICashInFee,
  ICashOutJuridicalFee,
  ICashOutNaturalFee,
} from '../types/types';

interface CommissionsFeeServiceInterface {
  getCashInFee: () => Promise<ICashInFee>;
  getCashOutNaturalFee: () => Promise<ICashOutNaturalFee>;
  getCashOutJuridicalFee: () => Promise<ICashOutJuridicalFee>;
}

class _CommissionsFeeService implements CommissionsFeeServiceInterface {
  private readonly https;

  constructor(httpService) {
    this.https = httpService;
  }

  getCashInFee = async (): Promise<ICashInFee> => {
    const result = await this.https.get('/cash-in');
    return result.data;
  };

  getCashOutNaturalFee = async (): Promise<ICashOutNaturalFee> => {
    const res = await this.https.get('/cash-out-natural');
    return res.data;
  };

  getCashOutJuridicalFee = async (): Promise<ICashOutJuridicalFee> => {
    const res = await this.https.get('/cash-out-juridical');
    return res.data;
  };
}

export const CommissionsFeeService = new _CommissionsFeeService(
  new BaseHttpServices(),
);
