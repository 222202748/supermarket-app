import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  const getImageUrl = (url) => {
    if (!url) return 'https://placehold.co/600x600';
    if (url.startsWith('http')) return url;
    return `http://localhost:5000${url}`;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        toast.error('Error loading product');
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }
    addToCart(product._id, quantity);
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-images">
            <img src={getImageUrl(product.images?.[0]?.url)} alt={product.name} />
          </div>
          <div className="product-details">
            <h1>{product.name}</h1>
            <p className="product-unit" style={{ fontSize: '1.1rem', color: '#666', marginBottom: '10px' }}>
              {product.quantity} {product.unit}
            </p>
            <p className="price">₹{product.price}</p>
            <p className="description">{product.description}</p>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={product.stock <= 0}>-</button>
              <span>{product.stock > 0 ? quantity : 0}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={product.stock <= 0}>+</button>
            </div>
            {product.stock <= 0 && (
              <p style={{ color: '#dc3545', fontWeight: 'bold', marginTop: '10px' }}>
                Currently Out of Stock
              </p>
            )}
            {product.stock > 0 && product.stock < 10 && (
              <p style={{ color: '#ffc107', fontWeight: 'bold', marginTop: '10px' }}>
                Hurry! Only {product.stock} left in stock
              </p>
            )}
            <button 
              className="btn-primary" 
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              style={{
                background: product.stock <= 0 ? '#ccc' : '',
                cursor: product.stock <= 0 ? 'not-allowed' : 'pointer'
              }}
            >
              {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
