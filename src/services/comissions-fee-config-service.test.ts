import {
  testCashInFee,
  testCashOutJuridicalFee,
  testCashOutNaturalFee,
} from './commission-fee-calculation/comissions-fee-calculation-service.test';
import { axios } from '../config/axios';
import { CommissionsFeeService } from './commissions-fee-config-service';

jest.mock('../config/axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('getCashInFee', () => {
  afterEach(jest.clearAllMocks);

  test('getCashInFee successful', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({
      data: testCashInFee,
    });
    const result = await CommissionsFeeService.getCashInFee();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(testCashInFee);
  });
});

describe('getCashOutNaturalFee', () => {
  afterEach(jest.clearAllMocks);

  test('getCashOutNaturalFee successful', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({
      data: testCashOutNaturalFee,
    });

    const result = await CommissionsFeeService.getCashOutNaturalFee();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(testCashOutNaturalFee);
  });
});

describe('getCashOutJuridicalFee', () => {
  test('getCashOutJuridicalFee successful', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({
      data: testCashOutJuridicalFee,
    });

    const result = await CommissionsFeeService.getCashOutJuridicalFee();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toEqual(testCashOutJuridicalFee);
  });
});
