import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FaBox, FaShoppingBag, FaUsers, FaMoneyBillWave } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchStats = async () => {
    try {
      // In a real app, you might have a dedicated dashboard stats endpoint
      // Here we'll fetch individual counts to simulate it
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        api.get('/products?limit=1'), // Just need count from metadata if available
        api.get('/orders'),
        api.get('/users')
      ]);

      // Calculate revenue from orders
      const orders = ordersRes.data.orders || [];
      const revenue = orders.reduce((acc, order) => acc + (order.paymentStatus === 'Completed' ? order.totalAmount : 0), 0);

      setStats({
        products: productsRes.data.total || 0,
        orders: ordersRes.data.total || orders.length,
        users: usersRes.data.users ? usersRes.data.users.length : 0,
        revenue
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-page">
      <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#e3f2fd', color: '#2196f3', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '15px' }}>
            <FaBox />
          </div>
          <div>
            <h3 style={{ margin: '0', fontSize: '1.8rem', color: '#2c3e50' }}>{stats.products}</h3>
            <p style={{ margin: '0', color: '#7f8c8d' }}>Total Products</p>
          </div>
        </div>

        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#e8f5e9', color: '#4caf50', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '15px' }}>
            <FaShoppingBag />
          </div>
          <div>
            <h3 style={{ margin: '0', fontSize: '1.8rem', color: '#2c3e50' }}>{stats.orders}</h3>
            <p style={{ margin: '0', color: '#7f8c8d' }}>Total Orders</p>
          </div>
        </div>

        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#fff3e0', color: '#ff9800', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '15px' }}>
            <FaUsers />
          </div>
          <div>
            <h3 style={{ margin: '0', fontSize: '1.8rem', color: '#2c3e50' }}>{stats.users}</h3>
            <p style={{ margin: '0', color: '#7f8c8d' }}>Total Users</p>
          </div>
        </div>

        <div className="stat-card" style={{ background: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#fce4ec', color: '#e91e63', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginRight: '15px' }}>
            <FaMoneyBillWave />
          </div>
          <div>
            <h3 style={{ margin: '0', fontSize: '1.8rem', color: '#2c3e50' }}>₹{stats.revenue.toFixed(2)}</h3>
            <p style={{ margin: '0', color: '#7f8c8d' }}>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="recent-activity">
        <h2 style={{ marginBottom: '20px', color: '#2c3e50' }}>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '15px' }}>
          <Link to="/admin/products" style={{ padding: '10px 20px', background: '#2196f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Manage Products</Link>
          <Link to="/admin/orders" style={{ padding: '10px 20px', background: '#4caf50', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
