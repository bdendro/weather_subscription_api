const SCHEDULE_WEATHER = {
  TEST: '0 * * * * *', // every minute
  HOURLY: '0 0 * * * *', // every hour at *:00:00
  DAILY: '0 0 8 * * *', // every day at 08:00:00 (am)
};

export default SCHEDULE_WEATHER;
