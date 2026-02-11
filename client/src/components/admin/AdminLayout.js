import React from 'react';
import { useLocation } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const location = useLocation();

  // Map path to title
  const getPageTitle = (path) => {
    const titles = {
      '/admin/dashboard': 'Dashboard',
      '/admin/products': 'Products',
      '/admin/categories': 'Categories',
      '/admin/orders': 'Orders',
      '/admin/customers': 'Customers',
      '/admin/reviews': 'Reviews',
    };
    return titles[path] || 'Admin Panel';
  };

  return (
    <div className="admin-container">
      {/* Main Content */}
      <div className="admin-main full-width">
        <header className="admin-header">
          <h1>{getPageTitle(location.pathname)}</h1>
        </header>
        
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
