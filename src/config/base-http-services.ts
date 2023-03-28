import { axios } from '../config/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseError } from '../config/error-entity';

export class BaseHttpServices {
  getErrorMessage(message: string): string | undefined {
    return message;
  }

  onResponse(response: any) {
    if (
      typeof response.data === 'object' &&
      'ok' in response.data &&
      !response.data.ok
    ) {
      throw new ResponseError(
        response,
        this.getErrorMessage(response.data.message),
      );
    }
  }

  async get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
  ): Promise<R> {
    const response = await axios.get(url, config);

    this.onResponse(response);

    return response as unknown as Promise<R>;
  }
}
