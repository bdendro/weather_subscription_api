import path from 'node:path';

const migrationsDir = path.resolve('src', 'db', 'migrations');

const MIGRATIONS = {
  DIR: migrationsDir,
  GLOB: ['*.js', { cwd: migrationsDir }],
  LOGGER_PATH: path.resolve('logs', 'migrations.log'),
  SUCCESS_MSG: 'Migration operation completed successfully.',
  ERROR_MSG: 'Migration action failed.',
  CONTENT: `export async function up({ context: queryInterface }) {}

export async function down({ context: queryInterface }) {}`,
};

export default MIGRATIONS;
