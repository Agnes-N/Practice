import { Router } from 'express';
import Payment from '../controllers/paymentController';

const router = Router();

router.post('/my-api/create-payment', Payment.setUpPayment)
    // Execute the payment:
    // 1. Set up a URL to handle requests from the PayPal button.
router.post('/my-api/execute-payment', Payment.finalizePayment);
// Run `node ./server.js` in your terminal

export default router;