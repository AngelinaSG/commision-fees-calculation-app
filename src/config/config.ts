import * as dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.APP_HOST || 'localhost';
const PORT = process.env.APP_PORT || '3000';
const INPUT_FILE_PATH = process.env.PATH_TO_FILE || './input.json';
const API_BASE_URL =
  process.env.API_BASE_URL || 'https://developers.paysera.com/tasks/api/';

export const config = {
  HOST,
  PORT,
  INPUT_FILE_PATH,
  API_BASE_URL,
};

// config.cashInAPI = process.env.CASH_IN_API;
// config.cashOutNaturalAPI = process.env.CASH_OUT_NATURAL_API;
// config.cashOutLegalAPI = process.env.CASH_OUT_LEGAL_API;
