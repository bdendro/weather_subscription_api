const validateEnv = (env) => {
  const missing = Object.entries(env)
    .filter(
      ([key, value]) => value === undefined || value === '' || value === null
    )
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(
      `Missing or invalid required env variables: ${missing.join(', ')}`
    );
  }
};

export default validateEnv;
