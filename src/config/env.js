import { ENV_DEV } from '../constants/env.js';
import validateEnv from '../utils/validateEnv.js';

const ENV = Object.freeze({
  NODE_ENV: process.env.NODE_ENV || ENV_DEV,

  APP_PORT: process.env.APP_PORT || 3000,

  DB_HOSTNAME: process.env.DB_HOSTNAME,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,

  WEATHER_BASE_URL: process.env.WEATHER_BASE_URL,
  WEATER_API_KEY: process.env.WEATER_API_KEY,
});

validateEnv(ENV);

export default ENV;
