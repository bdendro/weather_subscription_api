import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/connection.js';
import FREQUENCIES from '../constants/enums/frequencies.js';

class Subscription extends Model {}

Subscription.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(FREQUENCIES)),
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    token: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize,
    timestamps: true,
  }
);

export default Subscription;
