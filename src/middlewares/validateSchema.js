import { BadRequestError } from '../utils/customErrors.js';

const validateSchema =
  (schema, prop = 'body') =>
  async (req, res, next) => {
    const { error } = schema.validate(req[prop], {
      allowUnknown: false,
      abortEarly: false,
    });
    if (error) return next(new BadRequestError(error.message));

    next();
  };

export default validateSchema;
