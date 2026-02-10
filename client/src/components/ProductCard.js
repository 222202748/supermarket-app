import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { isAuthenticated, user, updateUser } = useContext(AuthContext);

  const isInWishlist = user?.wishlist?.some(item => 
    (typeof item === 'string' ? item : item._id) === product._id
  );

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    if (isAuthenticated) {
      addToCart(product._id, 1);
    } else {
      window.location.href = '/login';
    }
  };

  const handleToggleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent navigating to product detail
    
    if (!isAuthenticated) {
      toast.info('Please login to add to wishlist');
      return;
    }

    try {
      if (isInWishlist) {
        await api.delete(`/users/wishlist/${product._id}`);
        toast.success('Removed from wishlist');
      } else {
        await api.post(`/users/wishlist/${product._id}`);
        toast.success('Added to wishlist');
      }
      
      // Refresh user data to update wishlist state
      const response = await api.get('/auth/me');
      updateUser(response.data.user);
    } catch (error) {
      console.error('Error updating wishlist:', error);
      toast.error('Failed to update wishlist');
    }
  };

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/200';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  return (
    <div className="product-card" style={{ position: 'relative' }}>
      {product.discount > 0 && (
        <div className="discount-badge">-{product.discount}%</div>
      )}
      
      <button 
        className="wishlist-btn" 
        onClick={handleToggleWishlist}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '35px',
          height: '35px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 2,
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          color: isInWishlist ? '#ff4757' : '#ccc',
          fontSize: '1.2rem'
        }}
      >
        {isInWishlist ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/products/${product._id}`}>
        <div className="product-image" style={{ position: 'relative' }}>
          {product.stock <= 0 && (
            <div className="out-of-stock-overlay" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              color: '#dc3545',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textTransform: 'uppercase',
              borderBottom: '1px solid #eee'
            }}>
              Out of Stock
            </div>
          )}
          <img src={getImageUrl(product.images?.[0]?.url)} alt={product.name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <span className="product-quantity" style={{ fontSize: '0.9rem', color: '#666', display: 'block', marginBottom: '5px' }}>
            {product.quantity} {product.unit}
          </span>
          <div className="product-rating">
            <FaStar className="star" />
            <span>{product.ratings?.average?.toFixed(1) || '0.0'}</span>
            <span className="rating-count">({product.ratings?.count || 0})</span>
          </div>
          <p className="product-description">{product.description?.substring(0, 60)}...</p>
          <div className="product-price">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </Link>
      <button 
        className="add-to-cart-btn" 
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        style={{
          background: product.stock <= 0 ? '#ccc' : '',
          cursor: product.stock <= 0 ? 'not-allowed' : 'pointer'
        }}
      >
        <FaShoppingCart /> {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
