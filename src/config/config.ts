import * as dotenv from 'dotenv';

dotenv.config();

const INPUT_FILE_PATH = process.env.PATH_TO_FILE || './input.json';
const API_BASE_URL =
  process.env.API_BASE_URL || 'https://developers.paysera.com/';

export const config = {
  INPUT_FILE_PATH,
  API_BASE_URL,
} as const;
