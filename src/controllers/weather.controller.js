import { normalizeWeatherQuery } from '../middlewares/schemas/weather.schema.js';
import WeatherService from '../services/weather.service.js';

const weatherService = new WeatherService();

export const getWeather = async (req, res, next) => {
  const city = normalizeWeatherQuery(req.query.city);
  try {
    const weather = await weatherService.getWeather(city);
    return res.status(200).json(weather);
  } catch (err) {
    next(err);
  }
};
