import {
  AppError,
  ExternalServiceError,
  InternalServerError,
} from '../utils/customErrors.js';
import Logger from '../utils/logger/Logger.js';

const logger = new Logger();

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    if (err instanceof InternalServerError) {
      logger.error({ err: err.innerError || err });
      return res.status(err.statusCode).json({ message: err.message });
    }

    if (err instanceof ExternalServiceError) {
      // console.log({ err, inner: err.innerError });
      // console.log(
      //   err.innerError?.response?.status,
      //   err.innerError?.code,
      //   err.statusCode
      // );
      const msg = `[${err.serviceName}] (${
        err.innerError?.response?.status ||
        err.innerError?.code ||
        err.statusCode
      }) ${err.innerError ? `${err.innerError}` : ''}`;
      logger.error({ err, msg });
      return res.status(err.statusCode).json({ message: err.message });
    }

    return res.status(err.statusCode).json({ message: err.message });
  }

  logger.error({ err });
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
