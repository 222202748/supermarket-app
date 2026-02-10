const express = require('express');
const router = express.Router();
const {
  createRazorpayOrder,
  verifyRazorpayPayment,
  getRazorpayKey,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/razorpay/key', getRazorpayKey);
router.post('/razorpay/create-order', createRazorpayOrder);
router.post('/razorpay/verify', verifyRazorpayPayment);

module.exports = router;
