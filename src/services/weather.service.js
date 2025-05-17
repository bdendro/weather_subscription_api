import WeatherApiClient from '../clients/WeatherApi.client.js';
import ENV from '../config/env.js';

export default class WeatherService {
  constructor() {
    this.client = new WeatherApiClient(ENV.WEATER_API_KEY);
  }

  async getWeather(city) {
    return await this.client.getCurrentWeather(city);
  }
}
