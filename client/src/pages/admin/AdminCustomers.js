import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await api.get('/users');
      setCustomers(response.data.users || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
      toast.error('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading customers...</div>;

  return (
    <div className="admin-customers">
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Customers</h2>
      </div>

      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Role</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>{customer.name}</td>
                <td style={{ padding: '15px' }}>{customer.email}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ 
                    padding: '5px 10px', 
                    borderRadius: '20px', 
                    fontSize: '0.8rem',
                    background: customer.role === 'admin' ? '#e3f2fd' : '#f5f5f5',
                    color: customer.role === 'admin' ? '#1565c0' : '#616161'
                  }}>
                    {customer.role}
                  </span>
                </td>
                <td style={{ padding: '15px' }}>{new Date(customer.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
