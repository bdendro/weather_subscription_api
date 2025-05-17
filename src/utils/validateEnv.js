const validateEnv = (env) => {
  const missing = Object.entries(env)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing required env variables: ${missing.join(', ')}`);
  }
};

export default validateEnv;
