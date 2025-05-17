import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import ENV from './config/env.js';
import router from './routes/router.js';
import Logger from './utils/logger/Logger.js';
import sequelize from './db/connection.js';
import './models/index.js';
import errorHandler from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = new Logger();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

app.listen(ENV.APP_PORT, () => {
  logger.info(`Express server is listening on port ${ENV.APP_PORT}`);
});

process.on('SIGINT', async () => {
  logger.info('SIGINT');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('SIGTERM');
  await sequelize.close();
  process.exit(0);
});
