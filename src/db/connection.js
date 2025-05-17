import { Sequelize } from 'sequelize';
import Logger from '../utils/logger/Logger.js';
import ENV from '../config/env.js';

const logger = new Logger();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: ENV.DB_HOSTNAME,
  port: ENV.DB_PORT,
  username: ENV.DB_USERNAME,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  logging: false,
});

try {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.');
} catch (err) {
  logger.error({ err, msg: 'Database connection failed' });
  process.exit(1);
}

export default sequelize;
