import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import router from './routes/router.js';
import Logger from './utils/logger/Logger.js';
import sequelize from './db/connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = new Logger();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  logger.error({ err });
  return res.status(500).json({ message: 'Internal server error' });
});

app.listen(process.env.APP_PORT || 3000, () => {
  logger.info(`Express server is listening on port ${process.env.APP_PORT}`);
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
