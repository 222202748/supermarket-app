import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FaEye, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAmount, setEditingAmount] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, { orderStatus: status });
      toast.success('Order status updated');
      fetchOrders(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const updatePaymentStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/payment`, { paymentStatus: status });
      toast.success('Payment status updated');
      fetchOrders();
    } catch (error) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
    }
  };

  const handleEditAmount = (order) => {
    setEditingAmount(order._id);
    setNewAmount(order.totalAmount);
  };

  const saveAmount = async (id) => {
    try {
      await api.put(`/orders/${id}/amount`, { totalAmount: newAmount });
      toast.success('Order amount updated');
      setEditingAmount(null);
      fetchOrders();
    } catch (error) {
      console.error('Error updating amount:', error);
      toast.error(error.response?.data?.message || 'Failed to update amount');
    }
  };

  const cancelEdit = () => {
    setEditingAmount(null);
    setNewAmount('');
  };

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="admin-orders">
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '10px',
            width: '80%',
            maxWidth: '900px',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button 
              onClick={() => setSelectedOrder(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>

            <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Order Details #{selectedOrder._id.substring(0, 8)}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#666' }}>Customer Info</h3>
                <p><strong>Name:</strong> {selectedOrder.user?.name || 'Unknown'}</p>
                <p><strong>Email:</strong> {selectedOrder.user?.email || 'Unknown'}</p>
                <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> <span style={{ fontWeight: 'bold', color: '#3498db' }}>{selectedOrder.orderStatus}</span></p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#666' }}>Shipping Address</h3>
                <p>{selectedOrder.shippingAddress?.street}</p>
                <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.pincode}</p>
                <p>{selectedOrder.shippingAddress?.state}</p>
                <p><strong>Phone:</strong> {selectedOrder.shippingAddress?.phone}</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#666' }}>Order Items</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <thead style={{ background: '#f8f9fa' }}>
                <tr>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Price</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Quantity</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={item.image || 'https://placehold.co/50'} 
                        alt={item.name}
                        style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px' }}
                      />
                      {item.name}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>₹{item.price}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ width: '300px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal || (selectedOrder.totalAmount - (selectedOrder.shippingCharges || 0))}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                  <span>Shipping:</span>
                  <span>₹{selectedOrder.shippingCharges || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderTop: '2px solid #eee', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  <span>Total Amount:</span>
                  <span>₹{selectedOrder.totalAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', marginTop: '10px' }}>
                  <span>Payment Method:</span>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    background: selectedOrder.paymentMethod === 'COD' ? '#fff3cd' : '#e8f5e9',
                    color: selectedOrder.paymentMethod === 'COD' ? '#856404' : '#2e7d32',
                    fontSize: '0.9rem'
                  }}>
                    {selectedOrder.paymentMethod}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                  <span>Payment Status:</span>
                  <span style={{ 
                    fontWeight: 'bold',
                    color: selectedOrder.paymentStatus === 'Completed' ? '#2e7d32' : 
                           selectedOrder.paymentStatus === 'Failed' ? '#dc3545' : '#ffc107'
                  }}>
                    {selectedOrder.paymentStatus || (selectedOrder.isPaid ? 'Completed' : 'Pending')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Orders</h2>
      </div>

      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Order ID</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>User</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Total</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Payment</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontFamily: 'monospace' }}>{order._id.substring(0, 8)}...</td>
                <td style={{ padding: '15px' }}>{order.user?.name || 'Unknown'}</td>
                <td style={{ padding: '15px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '15px' }}>
                  {editingAmount === order._id ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input 
                        type="number" 
                        value={newAmount} 
                        onChange={(e) => setNewAmount(e.target.value)}
                        style={{ width: '80px', padding: '5px' }}
                      />
                      <FaCheck onClick={() => saveAmount(order._id)} style={{ color: 'green', cursor: 'pointer' }} />
                      <FaTimes onClick={cancelEdit} style={{ color: 'red', cursor: 'pointer' }} />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      ₹{order.totalAmount || order.totalPrice}
                      {order.paymentMethod === 'COD' && (
                        <FaEdit 
                          onClick={() => handleEditAmount(order)} 
                          style={{ color: '#aaa', cursor: 'pointer', fontSize: '0.8rem' }} 
                        />
                      )}
                    </div>
                  )}
                </td>
                <td style={{ padding: '15px' }}>
                  {order.paymentMethod === 'COD' ? (
                    <select 
                      value={order.paymentStatus || (order.isPaid ? 'Completed' : 'Pending')}
                      onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                      style={{ 
                        padding: '5px', 
                        borderRadius: '5px', 
                        border: '1px solid #ddd',
                        background: order.paymentStatus === 'Completed' ? '#e8f5e9' : '#ffebee',
                        color: order.paymentStatus === 'Completed' ? '#2e7d32' : '#c62828'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  ) : (
                    <span style={{ 
                      padding: '5px 10px', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem',
                      background: '#e8f5e9',
                      color: '#2e7d32'
                    }}>
                      Paid (Online)
                    </span>
                  )}
                </td>
                <td style={{ padding: '15px' }}>
                  <select 
                    value={order.orderStatus} 
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ddd' }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td style={{ padding: '15px' }}>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#3498db', cursor: 'pointer' }}
                    onClick={() => setSelectedOrder(order)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
