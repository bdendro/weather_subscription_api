export const ENV_LOCAL = 'dev';
export const ENV_PROD = 'prod';

export function isEnv(envStr) {
  return [ENV_LOCAL, ENV_PROD].includes(envStr);
}
