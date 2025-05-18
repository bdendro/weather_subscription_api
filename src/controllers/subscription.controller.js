import {
  normalizeSubscriptionToken,
  normalizeSubscription,
} from '../middlewares/schemas/subscription.schema.js';
import Subscription from '../models/Subscription.model.js';
import emailProvider from '../providers/Email.provider.js';
import SubscriptionService from '../services/subscription.service.js';

const subscriptionService = new SubscriptionService(Subscription);

export const subscribe = async (req, res, next) => {
  const subscription = normalizeSubscription(req.body);
  try {
    const resSubs = await subscriptionService.postSubscription(subscription);
    await emailProvider.sendConfirmationMail(resSubs.email, resSubs.token);
    return res.status(200).json({
      message: 'Subscription successful. Confirmation email sent.',
    });
  } catch (err) {
    next(err);
  }
};

export const confirmSubscription = async (req, res, next) => {
  const token = normalizeSubscriptionToken(req.params.token);
  try {
    const subscription = await subscriptionService.updateConfirmation(token, true);
    await emailProvider.sendConfirmedMail(subscription.email, token);
    return res.json({ message: 'Subscription confirmed successfully' });
  } catch (err) {
    next(err);
  }
};

export const unsubscribe = async (req, res, next) => {
  const token = normalizeSubscriptionToken(req.params.token);
  try {
    const deleted = await subscriptionService.deleteSubscriptionByToken(token);
    await emailProvider.sendUnsubscribedMail(deleted.email);
    return res.json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    next(err);
  }
};
