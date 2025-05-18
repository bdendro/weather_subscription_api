import Joi from 'joi';
import FREQUENCIES from '../../constants/enums/frequencies.js';

export const subscriptionSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  city: Joi.string().trim().max(255).required(),
  frequency: Joi.string()
    .trim()
    .valid(...Object.values(FREQUENCIES))
    .required(),
});

export const normalizeSubscription = ({ email, city, frequency }) => {
  return {
    email: email.toLowerCase(),
    city: city.trim(),
    frequency: frequency.trim(),
  };
};

export const subscriptionTokenSchema = Joi.object({
  token: Joi.string().trim().uuid({ version: 'uuidv4' }).required().messages({
    'string.guid': '{#label} must be a valid UUID v4',
  }),
});

export const normalizeSubscriptionToken = (token) => {
  return token.trim();
};
