import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import './Orders.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchOrder = async () => {
    try {
      const response = await api.get(`/orders/${id}`);
      setOrder(response.data.order);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading">Loading order details...</div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="orders-page">
        <div className="container">
          <h2>Order not found</h2>
          <Link to="/orders">Back to Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <div className="order-header">
          <h1>Order #{order._id.substring(order._id.length - 8).toUpperCase()}</h1>
          <span className={`order-status status-${order.orderStatus}`}>
            {order.orderStatus}
          </span>
        </div>

        <div className="order-detail-container">
          <div className="left-column">
            <div className="order-detail-section">
              <h2>Items</h2>
              {order.items.map((item, index) => (
                <div key={index} className="detail-row">
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <img 
                      src={item.image || 'https://placehold.co/50'} 
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                    />
                    <div>
                      <h4 style={{ margin: 0 }}>{item.name}</h4>
                      <small>Qty: {item.quantity}</small>
                    </div>
                  </div>
                  <div>₹{item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="order-detail-section">
              <h2>Shipping Address</h2>
              <div className="address-box">
                <p><strong>{order.shippingAddress.address}</strong></p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                <p>{order.shippingAddress.country}</p>
                <p>Phone: {order.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          <div className="right-column">
            <div className="order-detail-section">
              <h2>Order Summary</h2>
              <div className="detail-row">
                <span>Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              <div className="detail-row">
                <span>Shipping</span>
                <span>₹{order.shippingCharges}</span>
              </div>
              <div className="detail-row">
                <span>Tax</span>
                <span>₹{order.tax}</span>
              </div>
              <div className="detail-row" style={{ fontWeight: 'bold', borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '10px' }}>
                <span>Total</span>
                <span>₹{order.totalAmount}</span>
              </div>
            </div>

            <div className="order-detail-section">
              <h2>Payment Info</h2>
              <div className="detail-row">
                <span>Method</span>
                <span>{order.paymentMethod}</span>
              </div>
              <div className="detail-row">
                <span>Status</span>
                <span style={{ 
                  color: order.paymentStatus === 'Completed' ? 'green' : 'orange',
                  fontWeight: 'bold'
                }}>
                  {order.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
