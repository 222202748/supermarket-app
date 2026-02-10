import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { FaTrash, FaStar } from 'react-icons/fa';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Since reviews are embedded in products, we fetch products and extract reviews
      // In a production app with many reviews, this should be a dedicated endpoint with pagination
      const response = await api.get('/products?limit=1000'); // Fetch enough products
      const products = response.data.products || [];
      
      const allReviews = [];
      products.forEach(product => {
        if (product.reviews && product.reviews.length > 0) {
          product.reviews.forEach(review => {
            allReviews.push({
              ...review,
              productName: product.name,
              productId: product._id,
              productImage: product.images?.[0]?.url
            });
          });
        }
      });
      
      // Sort by date desc
      allReviews.sort((a, b) => new Date(b.createdAt || Date.now()) - new Date(a.createdAt || Date.now()));
      
      setReviews(allReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      // Feature not implemented in backend yet
      toast.info('Delete review functionality requires backend update');
    }
  };

  if (loading) return <div className="loading">Loading reviews...</div>;

  return (
    <div className="admin-reviews">
      <div className="page-header" style={{ marginBottom: '30px' }}>
        <h2>Reviews</h2>
      </div>

      <div style={{ background: 'white', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Product</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>User</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Rating</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Comment</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length > 0 ? reviews.map((review, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={review.productImage || 'https://via.placeholder.com/40'} 
                    alt={review.productName} 
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                  />
                  <span>{review.productName}</span>
                </td>
                <td style={{ padding: '15px' }}>{review.name}</td>
                <td style={{ padding: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', color: '#ffc107' }}>
                    {review.rating} <FaStar style={{ marginLeft: '5px', fontSize: '0.8rem' }} />
                  </div>
                </td>
                <td style={{ padding: '15px' }}>{review.comment}</td>
                <td style={{ padding: '15px' }}>{new Date(review.createdAt || Date.now()).toLocaleDateString()}</td>
                <td style={{ padding: '15px' }}>
                  <button 
                    style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}
                    onClick={() => handleDelete(review.productId, review._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                  No reviews found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
