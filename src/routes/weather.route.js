import { Router } from 'express';
import { getWeather } from '../controllers/weather.controller.js';
import validateSchema from '../middlewares/validateSchema.js';
import { weatherQuerySchema } from '../middlewares/schemas/weather.schema.js';

const weatherRouter = Router();

weatherRouter.get(
  '/weather',
  validateSchema(weatherQuerySchema, 'query'),
  getWeather
);

export default weatherRouter;
