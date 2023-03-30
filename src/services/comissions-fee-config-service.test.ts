import {
  testCashInFee,
  testCashOutJuridicalFee,
  testCashOutNaturalFee,
} from '../dummy-data/dummy-data';
import { axios } from '../config/axios';
import { CommissionsFeeService } from './commissions-fee-config-service';

jest.mock('../config/axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe('getCashInFee:', () => {
  afterEach(jest.clearAllMocks);

  test('API call is successful', async () => {
    (mockedAxios.get as jest.Mock).mockResolvedValueOnce({
      data: testCashInFee,
    });
    const result = await CommissionsFeeService.getCashInFee();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(testCashInFee);
  });

  test('API call should throw error', async () => {
    (mockedAxios.get as jest.Mock).mockRejectedValueOnce('NETWORK_ERROR');

    try {
      await CommissionsFeeService.getCashInFee();
    } catch (e) {
      expect(e).toEqual('NETWORK_ERROR');
    }
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

  test('API call should throw error', async () => {
    (mockedAxios.get as jest.Mock).mockRejectedValueOnce('NETWORK_ERROR');

    try {
      await CommissionsFeeService.getCashOutNaturalFee();
    } catch (e) {
      expect(e).toEqual('NETWORK_ERROR');
    }
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

  test('API call should throw error', async () => {
    (mockedAxios.get as jest.Mock).mockRejectedValueOnce('NETWORK_ERROR');

    try {
      await CommissionsFeeService.getCashOutNaturalFee();
    } catch (e) {
      expect(e).toEqual('NETWORK_ERROR');
    }
  });
});
