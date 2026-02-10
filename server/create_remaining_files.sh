#!/bin/bash

# Create all remaining React pages and CSS files

# Global CSS
cat > client/src/styles/global.css << 'EOF'
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', 'Helvetica', sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  min-height: calc(100vh - 400px);
}

.btn-primary {
  background: #FFA500;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  transition: background 0.3s;
}

.btn-primary:hover {
  background: #ff8c00;
}

.btn-secondary {
  background: #32CD32;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.loading {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
}

.error {
  color: #ff4444;
  padding: 20px;
  text-align: center;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin: 40px 0 30px;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
  }
}
EOF

# Home.css
cat > client/src/pages/Home.css << 'EOF'
.hero-section {
  padding: 40px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-slide {
  padding: 40px 0;
}

.slide-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.slide-text h1 {
  font-size: 3rem;
  margin-bottom: 20px;
}

.highlight {
  color: #32CD32;
}

.shop-now-btn {
  background: #FFA500;
  color: white;
  padding: 15px 40px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;
  margin-top: 20px;
}

.category-boxes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
}

.category-box {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;
  color: #333;
  transition: transform 0.3s;
}

.category-box:hover {
  transform: translateY(-5px);
}

.info-banners {
  background: white;
  padding: 40px 0;
  margin-top: 40px;
}

.banner-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.info-banner {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
}

.banner-icon {
  font-size: 3rem;
  color: #32CD32;
}

@media (max-width: 768px) {
  .slide-content {
    flex-direction: column;
  }
  
  .category-boxes {
    grid-template-columns: 1fr;
  }
  
  .banner-grid {
    grid-template-columns: 1fr;
  }
}
EOF

# Simple versions of all pages
cat > client/src/pages/Home.js << 'EOF'
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products/featured');
        setFeaturedProducts(response.data.products);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <h1>Always fresh <span className="highlight">VEGETABLES</span></h1>
          <p>Farm fresh groceries delivered to your doorstep</p>
          <Link to="/products" className="shop-now-btn">Shop Now!</Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
EOF

# Products page
cat > client/src/pages/Products.js << 'EOF'
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import api from '../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const category = searchParams.get('category');
      const search = searchParams.get('search');
      
      let url = '/products?';
      if (category) url += `category=${category}&`;
      if (search) url += `search=${search}&`;
      
      const response = await api.get(url);
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="section-title">Products</h1>
        <div className="products-grid">
          {products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
EOF

# Product Detail page
cat > client/src/pages/ProductDetail.js << 'EOF'
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
    addToCart(product._id, quantity);
  };

  if (!product) return <div className="loading">Loading...</div>;

  return (
    <div className="product-detail">
      <div className="container">
        <div className="product-detail-grid">
          <div className="product-images">
            <img src={product.images?.[0]?.url || '/placeholder.jpg'} alt={product.name} />
          </div>
          <div className="product-details">
            <h1>{product.name}</h1>
            <p className="price">₹{product.price}</p>
            <p className="description">{product.description}</p>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button className="btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
EOF

echo "Created pages: Home, Products, ProductDetail"

# Create remaining simple pages
for page in Cart Checkout Login Register Profile Orders OrderDetail Wishlist About Contact; do
  cat > client/src/pages/${page}.js << EOF
import React from 'react';

const ${page} = () => {
  return (
    <div className="${page,,}-page">
      <div className="container">
        <h1>${page}</h1>
        <p>This is the ${page} page. Implementation pending.</p>
      </div>
    </div>
  );
};

export default ${page};
EOF
done

echo "All pages created successfully!"
