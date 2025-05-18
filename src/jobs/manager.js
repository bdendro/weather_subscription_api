import cron from 'node-cron';
import WeatherNotificationJob from './WeatherNotification.job.js';
import WeatherService from '../services/weather.service.js';
import SubscriptionService from '../services/subscription.service.js';
import Subscription from '../models/Subscription.model.js';
import SCHEDULE_WEATHER from '../constants/scheduleWeather.js';
import ENV from '../config/env.js';
import Logger from '../utils/logger/Logger.js';

const logger = new Logger();

const subscriptionService = new SubscriptionService(Subscription);

const weatherNotificationJob = new WeatherNotificationJob(
  new WeatherService(),
  subscriptionService
);

cron.schedule(SCHEDULE_WEATHER.HOURLY, () => weatherNotificationJob.notifyHourly(), {
  timezone: ENV.APP_TIMEZONE,
});

cron.schedule(SCHEDULE_WEATHER.DAILY, () => weatherNotificationJob.notifyDaily(), {
  timezone: ENV.APP_TIMEZONE,
});

cron.schedule(
  ENV.UNCONFIRMED_SCHEDULE,
  async () => {
    try {
      const affectedRows = await subscriptionService.deleteUnconfirmed(
        ENV.UNCONFIRMED_EXPIRATION_TIME
      );
      logger.info(`Scheduled cleanup: ${affectedRows} unconfirmed subscriptions deleted`);
    } catch (err) {
      logger.error({
        err,
        msg: `failed to delete unconfirmed subscriptions during scheduled cleanup`,
      });
    }
  },
  { timezone: ENV.APP_TIMEZONE }
);
