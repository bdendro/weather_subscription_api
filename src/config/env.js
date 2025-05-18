import { ENV_DEV } from '../constants/env.js';
import parseBoolean from '../utils/parseBoolean.js';
import validateEnv from '../utils/validateEnv.js';

const ENV = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || ENV_DEV,

  APP_PORT: Number(process.env.APP_PORT) || 3000,
  APP_BASE_URL: process.env.APP_BASE_URL,

  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_PORT: Number(process.env.DB_PORT) || null,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  EMAIL: process.env.EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_PORT: Number(process.env.EMAIL_PORT) || null,
  EMAIL_SECURE: parseBoolean(process.env.EMAIL_SECURE),

  WEATHER_BASE_URL: process.env.WEATHER_BASE_URL,
  WEATER_API_KEY: process.env.WEATER_API_KEY,
});

validateEnv(ENV);

export default ENV;
