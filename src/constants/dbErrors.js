import { Sequelize } from 'sequelize';

export const DB_ERRORS = Object.freeze({
  UNIQUE_CONSTRAINT: Sequelize.UniqueConstraintError,
  FOREIGN_KEY_CONSTRAINT: Sequelize.ForeignKeyConstraintError,
  VALIDATION_ERROR: Sequelize.ValidationError,
  DATABASE_ERROR: Sequelize.DatabaseError,
});
