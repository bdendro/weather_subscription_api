import ENV from '../config/env.js';
import createApiClient from '../utils/createApiClient.js';
import { NotFoundError } from '../utils/customErrors.js';

export default class WeatherApiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = ENV.WEATHER_BASE_URL;
    this.serviceName = 'WeatherAPI';
    this.client = createApiClient(
      this.baseUrl,
      { key: this.apiKey },
      this.serviceName
    );
  }

  async getCurrentWeather(city) {
    try {
      const { data } = await this.client.get('/current.json', {
        params: { q: city },
      });
      return data.current;
    } catch (err) {
      if (err.response?.data?.error?.code === 1006) {
        throw new NotFoundError('City not found');
      }
      throw err;
    }
  }
}
