const express = require('express');
const router = express.Router();
const {
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  getUsers,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');

// All user routes are protected
router.use(protect);

// Admin routes
router.get('/', authorize('admin'), getUsers);

// Address management
router.post('/address', addAddress);
router.put('/address/:addressId', updateAddress);
router.delete('/address/:addressId', deleteAddress);
router.put('/address/:addressId/default', setDefaultAddress);

// Wishlist management
router.get('/wishlist', getWishlist);
router.post('/wishlist/:productId', addToWishlist);
router.delete('/wishlist/:productId', removeFromWishlist);

module.exports = router;
