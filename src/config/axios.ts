import Axios from 'axios';
import { config } from './config';

const axiosInstance = Axios.create({
  baseURL: config.API_BASE_URL,
});

export const axios = axiosInstance;
