import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart, loading } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Check if any item has stock issues
  const hasStockIssues = cart.items?.some(item => 
    item.product && (item.product.stock <= 0 || item.quantity > item.product.stock)
  );

  const handleQuantityChange = async (itemId, currentQty, change) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    await updateCartItem(itemId, newQty);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="loading">Loading cart...</div>
        </div>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/products" className="continue-shopping">Start Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => {
              // Guard clause for missing product data (e.g. deleted product)
              if (!item.product) {
                return (
                  <div key={item._id} className="cart-item">
                    <div className="item-details">
                      <h3 style={{ color: 'red' }}>Product Unavailable</h3>
                      <p>This item is no longer available.</p>
                    </div>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                );
              }
              
              return (
              <div key={item._id} className="cart-item">
                <img 
                  src={item.product.images?.[0]?.url || 'https://placehold.co/100'} 
                  alt={item.product.name} 
                  className="cart-item-image" 
                />
                
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                    {item.product.quantity} {item.product.unit}
                  </div>
                  <div className="price">₹{item.price}</div>
                  {item.product.stock <= 0 && (
                    <div style={{ color: '#dc3545', fontSize: '0.85rem', marginTop: '5px', fontWeight: 'bold' }}>
                      Out of Stock
                    </div>
                  )}
                  {item.product.stock > 0 && item.quantity > item.product.stock && (
                    <div style={{ color: '#ffc107', fontSize: '0.85rem', marginTop: '5px', fontWeight: 'bold' }}>
                      Only {item.product.stock} available
                    </div>
                  )}
                </div>

                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus size={10} />
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity, 1)}
                    disabled={item.product.stock <= item.quantity}
                  >
                    <FaPlus size={10} />
                  </button>
                </div>

                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  <FaTrash />
                </button>
              </div>
            )})}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cart.items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
              <span>₹{cart.totalPrice}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span>{cart.totalPrice > 500 ? 'Free' : '₹50'}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>₹{cart.totalPrice + (cart.totalPrice > 500 ? 0 : 50)}</span>
            </div>
            <button 
              className="checkout-btn" 
              onClick={handleCheckout}
              disabled={hasStockIssues}
              style={{
                background: hasStockIssues ? '#ccc' : '',
                cursor: hasStockIssues ? 'not-allowed' : 'pointer'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
