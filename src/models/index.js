import sequelize from '../db/connection.js';
import Subscription from './Subscription.model.js';

const models = sequelize.models;

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});
