import axios from 'axios';
import {
  ApiTimeoutError,
  ApiUnavailableError,
  TooManyApiRequestsError,
} from './customErrors.js';

const createApiClient = (baseURL, params = {}, serviceName = 'API') => {
  const client = axios.create({
    baseURL,
    timeout: 5000,
    params: {
      ...params,
    },
  });

  client.interceptors.response.use(
    (res) => res,
    (err) => {
      const status = err.response?.status;
      const code = err.code;

      if (code === 'ECONNABORTED' || status === 504) {
        return Promise.reject(new ApiTimeoutError(serviceName, err));
      }

      if (code === 'ENOTFOUND' || [500, 502, 503].includes(status)) {
        return Promise.reject(new ApiUnavailableError(serviceName, err));
      }

      if (status === 429) {
        return Promise.reject(new TooManyApiRequestsError(serviceName, err));
      }

      return Promise.reject(err);
    }
  );

  return client;
};

export default createApiClient;
