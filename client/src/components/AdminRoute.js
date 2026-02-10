import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminLayout from './admin/AdminLayout';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

export default AdminRoute;
