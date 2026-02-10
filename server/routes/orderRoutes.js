const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  updateOrderAmount,
  getUserOrders,
  cancelOrder,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

// Protected routes
router.use(protect);

router.post('/', createOrder);
router.get('/my-orders', getUserOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);

// Admin routes
router.get('/', authorize('admin'), getOrders);
router.put('/:id/status', authorize('admin'), updateOrderStatus);
router.put('/:id/payment', authorize('admin'), updatePaymentStatus);
router.put('/:id/amount', authorize('admin'), updateOrderAmount);

module.exports = router;
