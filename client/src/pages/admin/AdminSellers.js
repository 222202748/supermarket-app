import React from 'react';

const AdminSellers = () => {
  return (
    <div className="admin-sellers">
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Sellers / Vendors</h2>
      </div>
      
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '10px', 
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '3rem', color: '#cbd5e1', marginBottom: '20px' }}>🏪</div>
        <h3>Seller Management Pending</h3>
        <p style={{ color: '#64748b' }}>This module is currently under development.</p>
      </div>
    </div>
  );
};

export default AdminSellers;
