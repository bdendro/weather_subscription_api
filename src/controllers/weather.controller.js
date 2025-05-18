import WeatherDto from '../dto/weather/Weather.dto.js';
import { normalizeWeatherQuery } from '../middlewares/schemas/weather.schema.js';
import WeatherService from '../services/weather.service.js';

const weatherService = new WeatherService();

export const getWeather = async (req, res, next) => {
  const city = normalizeWeatherQuery(req.query.city);
  try {
    const weather = await weatherService.getWeather(city);
    return res.status(200).json(
      new WeatherDto({
        temperature: weather?.temp_c,
        humidity: weather?.humidity,
        description: weather?.condition?.text,
      })
    );
  } catch (err) {
    next(err);
  }
};
