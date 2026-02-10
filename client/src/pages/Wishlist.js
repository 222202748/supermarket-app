import React, { useContext } from 'react';
import ProductCard from '../components/ProductCard';
import { AuthContext } from '../context/AuthContext';

const Wishlist = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 0' }}>
        <div className="loading">Loading wishlist...</div>
      </div>
    );
  }

  // Ensure wishlist is an array and filter out any potential nulls/strings if population failed
  const wishlist = user?.wishlist?.filter(item => typeof item === 'object' && item !== null) || [];

  return (
    <div className="wishlist-page" style={{ padding: '40px 0', minHeight: '80vh', backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px', color: '#2c3e50' }}>My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="empty-cart" style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '10px' }}>
            <h2>Your wishlist is empty</h2>
            <p>Save items you want to buy later!</p>
          </div>
        ) : (
          <div className="products-grid">
            {wishlist.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
