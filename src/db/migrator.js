import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from './connection.js';
import Logger from '../utils/logger/Logger.js';
import MIGRATIONS from '../constants/migrations.js';

const __filename = fileURLToPath(import.meta.url);

const migrationLogger = new Logger();

function makeTemplate(filepath) {
  return [[filepath, MIGRATIONS.CONTENT]];
}

const umzug = new Umzug({
  migrations: { glob: MIGRATIONS.GLOB },
  create: {
    folder: MIGRATIONS.DIR,
    template: makeTemplate,
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  logger: console,
});

if (process.argv[1] === __filename) {
  const success = await umzug.runAsCLI();
  success
    ? migrationLogger.info(MIGRATIONS.SUCCESS_MSG)
    : migrationLogger.error({ msg: MIGRATIONS.ERROR_MSG });
  await sequelize.close();
}
