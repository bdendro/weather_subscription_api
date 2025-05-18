import { NotFoundError } from '../utils/customErrors.js';
import emailProvider from '../providers/Email.provider.js';
import Logger from '../utils/logger/Logger.js';
import defaultWeather from '../constants/defaultWeather.js';
import FREQUENCIES from '../constants/enums/frequencies.js';

const logger = new Logger();

export default class WeatherNotificationJob {
  constructor(weatherService, subscriptionService) {
    this.weatherService = weatherService;
    this.subscriptionService = subscriptionService;
    this.emailProvider = emailProvider;
  }

  async _sendWeatherToSubscribers(frequency) {
    logger.info(`Weather notification execution (${frequency})`);
    try {
      const subscriptions = await this.subscriptionService.getByFrequency(
        frequency
      );
      for (const sub of subscriptions) {
        try {
          const weather = await this.weatherService.getWeather(sub.city);
          await this.emailProvider.sendWeatherMail(
            sub.email,
            weather,
            sub.token,
            sub.city
          );
        } catch (err) {
          if (err instanceof NotFoundError) {
            await this.emailProvider.sendWeatherMail(
              sub.email,
              defaultWeather,
              sub.token,
              `${sub.city} (Unknown)`
            );
            continue;
          }
          logger.error({
            err,
            msg: `while doing scheduled (${frequency}) weather task`,
          });
        }
      }
    } catch (err) {
      logger.error({
        err,
        msg: `while doing scheduled (${frequency}) weather task`,
      });
    }
  }

  async notifyHourly() {
    await this._sendWeatherToSubscribers(FREQUENCIES.HOURLY);
  }

  async notifyDaily() {
    await this._sendWeatherToSubscribers(FREQUENCIES.DAILY);
  }
}
