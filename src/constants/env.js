export const ENV_DEV = 'dev';
export const ENV_PROD = 'prod';

export function isEnv(envStr) {
  return [ENV_DEV, ENV_PROD].includes(envStr);
}
