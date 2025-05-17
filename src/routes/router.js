import { Router } from 'express';
import weatherRouter from './weather.route.js';
import subscriptionRouter from './subscription.route.js';

const router = Router();

router.use('/', weatherRouter);
router.use('/', subscriptionRouter);

export default router;
