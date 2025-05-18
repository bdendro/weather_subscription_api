import { DB_ERRORS } from '../constants/dbErrors.js';
import sequelize from '../db/connection.js';
import { ConflictError, NotFoundError } from '../utils/customErrors.js';
import Subscription from '../models/Subscription.model.js';
export default class SubscriptionService {
  constructor(subscription) {
    this.Subscription = Subscription;
  }

  async postSubscription(subscription) {
    try {
      return await this.Subscription.create(subscription);
    } catch (err) {
      if (err instanceof DB_ERRORS.UNIQUE_CONSTRAINT) {
        throw new ConflictError('Email already subscribed');
      }
      throw err;
    }
  }

  async updateConfirmation(token, confirmed) {
    const [affectedRows, updatedSubs] = await this.Subscription.update(
      { confirmed },
      { where: { token }, returning: true }
    );
    if (!affectedRows) throw new NotFoundError('Token not found');
    return updatedSubs[0];
  }

  async deleteSubscriptionByToken(token) {
    const deleted = await sequelize.transaction(async (t) => {
      const record = await this.Subscription.findOne({
        where: { token, confirmed: true },
        lock: t.LOCK.UPDATE,
        transaction: t,
      });
      if (!record) throw new NotFoundError('Token not found');

      await record.destroy({ transaction: t });
      return record;
    });
    return deleted;
    // const a = await this.Subscription.destroy({
    //   where: { token, confirmed: true },
    //   returning: true,
    // });
    // console.log(a);
    // if (!a) throw new NotFoundError('Token not found');
    // return a;
  }
}
