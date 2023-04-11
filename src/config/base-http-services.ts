import { axios } from '../config/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export class BaseHttpServices {
  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    const response = await axios.get(url, config);

    return response as unknown as Promise<R>;
  }
}
