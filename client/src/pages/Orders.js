import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders/my-orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="loading">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="empty-cart">
            <h2>No orders found</h2>
            <p>You haven't placed any orders yet.</p>
            <Link to="/products" className="continue-shopping">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className={`order-card status-${order.orderStatus}`}>
                <div className="order-info">
                  <h3>Order #{order._id.substring(order._id.length - 8).toUpperCase()}</h3>
                  <div className="order-meta">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <div className="order-meta">
                    Items: {order.items.length} | Total: ₹{order.totalAmount}
                  </div>
                </div>
                
                <div className="order-actions">
                  <span className={`order-status status-${order.orderStatus}`}>
                    {order.orderStatus}
                  </span>
                </div>
                
                <Link to={`/orders/${order._id}`} className="view-order-btn">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
