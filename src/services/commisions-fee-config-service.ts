import { BaseHttpServices } from '../config/base-http-services';
import {ICashInFee, ICashOutJuridicalFee, ICashOutNaturalFee} from "../types/types";

interface CommissionsFeeServiceInterface {
  getCashInFee: () => Promise<ICashInFee>;
  getCashOutNaturalFee: () => Promise<ICashOutNaturalFee>;
  getCashOutJuridicalFee: () => Promise<ICashOutJuridicalFee>
}

class _CommissionsFeeService implements CommissionsFeeServiceInterface {
  private readonly https;

  constructor(httpService) {
    this.https = httpService;
  }

  getCashInFee = async () => {
    const res = await this.https.get('/cash-in');
    return res.data;
  };

  getCashOutNaturalFee = async () => {
    const res = await this.https.get('/cash-out-natural');
    return res.data;
  };

  getCashOutJuridicalFee = async () => {
    const res = await this.https.get('/cash-out-juridical');
    return res.data;
  };
}

export const CommissionsFeeService = new _CommissionsFeeService(
  new BaseHttpServices(),
);
