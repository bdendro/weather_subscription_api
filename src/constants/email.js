import ENV from '../config/env.js';

const EMAIL = {
  CONFIRMATION_BASE_URL: `${ENV.APP_BASE_URL}/confirm`,
  UNSUBSCRIBE_BASE_URL: `${ENV.APP_BASE_URL}/unsubscribe`,
  SUBJECT_CONFIRMATION: 'Weather subscription confirmation',
  SUBJECT_WEATHER: 'Weather report',
  SUBJECT_CONFIRMED: 'Weather subscription confirmed',
  SUBJECT_CANCELED: 'Weather subscription canceled',
};

export default EMAIL;
