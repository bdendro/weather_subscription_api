import Joi from 'joi';

export const weatherQuerySchema = Joi.object({
  city: Joi.string().trim().min(1).max(255).required(),
});

export const normalizeWeatherQuery = (city) => {
  return city.trim();
};
