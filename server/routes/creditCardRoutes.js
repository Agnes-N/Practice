import { Router } from 'express';
import CardPayment from '../controllers/cardController';

const router = Router();

router.get('/initializeBraintree', CardPayment.initializeBraintree);

router.post('/confirmBraintree', CardPayment.confirmBraintree);

export default router;