import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    pincode: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setShippingAddress(prev => ({
        ...prev,
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    const subtotal = cart.totalPrice || 0;
    const shippingCharges = subtotal > 500 ? 0 : 50;
    const tax = subtotal * 0.05; // 5% tax example
    const totalAmount = subtotal + shippingCharges + tax;
    return { subtotal, shippingCharges, tax, totalAmount };
  };

  const { subtotal, shippingCharges, tax, totalAmount } = calculateTotal();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state || !shippingAddress.pincode || !shippingAddress.phone) {
      toast.error('Please fill in all shipping details');
      return;
    }

    try {
      setLoading(true);

      const validItems = cart.items.filter(item => item.product && item.product._id);
      
      if (validItems.length === 0) {
        toast.error('Your cart contains invalid items. Please clear your cart and try again.');
        setLoading(false);
        return;
      }

      if (paymentMethod === 'Online') {
        const res = await loadRazorpay();
        if (!res) {
          toast.error('Razorpay SDK failed to load. Are you online?');
          setLoading(false);
          return;
        }

        // Get Razorpay Key
        const { data: { key } } = await api.get('/payment/razorpay/key');

        // Create Order
        const result = await api.post('/payment/razorpay/create-order', { amount: totalAmount });
        if (!result.data.success) {
          toast.error('Server error. Are you online?');
          setLoading(false);
          return;
        }

        const { amount, id: order_id, currency } = result.data.order;

        const options = {
          key: key,
          amount: amount.toString(),
          currency: currency,
          name: "SuperMarket App",
          description: "Order Payment",
          order_id: order_id,
          handler: async function (response) {
            try {
              const verifyRes = await api.post('/payment/razorpay/verify', {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.data.success) {
                // Place Final Order
                const orderData = {
                  items: validItems.map(item => ({
                    product: item.product._id,
                    name: item.product.name || 'Unknown Product',
                    quantity: item.quantity,
                    price: item.price,
                    image: item.product.images?.[0]?.url
                  })),
                  shippingAddress,
                  paymentMethod: 'Razorpay',
                  paymentInfo: {
                    id: response.razorpay_payment_id,
                    status: 'succeeded'
                  },
                  subtotal,
                  shippingCharges,
                  tax,
                  totalAmount
                };

                const orderRes = await api.post('/orders', orderData);
                if (orderRes.data.success) {
                  await clearCart();
                  toast.success('Order placed successfully!');
                  navigate('/orders');
                }
              }
            } catch (error) {
              console.error('Payment verification error:', error);
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: shippingAddress.phone,
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function() {
              setLoading(false);
            }
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

      } else {
        // COD
        const orderData = {
          items: validItems.map(item => ({
            product: item.product._id,
            name: item.product.name || 'Unknown Product',
            quantity: item.quantity,
            price: item.price,
            image: item.product.images?.[0]?.url
          })),
          shippingAddress,
          paymentMethod,
          paymentInfo: { id: 'cod_payment' },
          subtotal,
          shippingCharges,
          tax,
          totalAmount
        };

        const response = await api.post('/orders', orderData);
        
        if (response.data.success) {
          await clearCart();
          toast.success('Order placed successfully!');
          navigate('/orders');
        }
        setLoading(false);
      }

    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
      setLoading(false);
    }
  };

  if (!cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1>Checkout</h1>
        
        <form onSubmit={handlePlaceOrder} className="checkout-container">
          <div className="checkout-details">
            <div className="checkout-section">
              <h2>Shipping Address</h2>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={shippingAddress.pincode}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="checkout-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery (COD)</span>
                </label>
                <label className={`payment-option ${paymentMethod === 'Online' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === 'Online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Online Payment (Razorpay)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="order-summary-container">
            <div className="checkout-section">
              <h2>Order Summary</h2>
              {cart.items.map(item => (
                <div key={item._id} className="order-summary-item">
                  <span>{item.product?.name || 'Unknown Product'} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              
              <div className="order-total-breakdown">
                <div className="order-summary-item">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="order-summary-item">
                  <span>Tax (5%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="order-summary-item">
                  <span>Shipping</span>
                  <span>{shippingCharges === 0 ? 'Free' : `₹${shippingCharges}`}</span>
                </div>
                <div className="order-total">
                  <span>Total Amount</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button 
                type="submit" 
                className="place-order-btn" 
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
