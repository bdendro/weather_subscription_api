import { Router } from 'express';
import {
  confirmSubscription,
  subscribe,
  unsubscribe,
} from '../controllers/subscription.controller.js';
import validateSchema from '../middlewares/validateSchema.js';
import {
  subscriptionTokenSchema,
  subscriptionSchema,
} from '../middlewares/schemas/subscription.schema.js';

const subscriptionRouter = Router();

subscriptionRouter.post(
  '/subscribe',
  validateSchema(subscriptionSchema),
  subscribe
);

subscriptionRouter.get(
  '/confirm/:token',
  validateSchema(subscriptionTokenSchema, 'params'),
  confirmSubscription
);

subscriptionRouter.get(
  '/unsubscribe/:token',
  validateSchema(subscriptionTokenSchema, 'params'),
  unsubscribe
);

export default subscriptionRouter;
