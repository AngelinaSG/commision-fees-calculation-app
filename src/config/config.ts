import dotenv from 'dotenv';

dotenv.config();

const API_BASE_URL = process.env.API_BASE_URL;

export const config = {
  API_BASE_URL,
} as const;
