export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Invalid request') {
    super(message, 400);
  }
}

export class InternalServerError extends AppError {
  constructor(
    message = 'Internal server error',
    statusCode = 500,
    innerError = null
  ) {
    super(message, statusCode);
    this.innerError = innerError;
  }
}

export class ExternalServiceError extends AppError {
  constructor(serviceName, message, statusCode, innerError = null) {
    super(message, statusCode);
    this.serviceName = serviceName;
    this.innerError = innerError;
  }
}

export class ApiUnavailableError extends ExternalServiceError {
  constructor(
    serviceName = 'API',
    innerError = null,
    message = 'Service temporarily unavailable'
  ) {
    super(serviceName, message, 503, innerError);
  }
}

export class ApiTimeoutError extends ExternalServiceError {
  constructor(serviceName = 'API', innerError = null) {
    super(serviceName, 'Request timed out', 504, innerError);
  }
}

export class TooManyApiRequestsError extends ExternalServiceError {
  constructor(serviceName = 'API', innerError = null) {
    super(serviceName, 'Too many requests. Try later', 429, innerError);
  }
}
