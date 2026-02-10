import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import HomeCarousel from '../components/HomeCarousel';
import CategoryCircles from '../components/CategoryCircles';
import api from '../services/api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [featuredRes, latestRes, categoriesRes] = await Promise.all([
          api.get('/products/featured'),
          api.get('/products?limit=8&sort=createdAt'),
          api.get('/categories')
        ]);
        
        setFeaturedProducts(featuredRes.data.products || []);
        setLatestProducts(latestRes.data.products || []);
        setCategories(categoriesRes.data.categories || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-page">
      <div className="container" style={{ marginTop: '20px' }}>
        <HomeCarousel />
        <CategoryCircles categories={categories} />
      </div>

      <section className="featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <div className="products-grid">
            {featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="no-products">No featured products found.</p>
            )}
          </div>
        </div>
      </section>

      <section className="latest-section">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="products-grid">
            {latestProducts.length > 0 ? (
              latestProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="no-products">No new products found.</p>
            )}
          </div>
        </div>
      </section>
      
      <section className="info-banners">
        <div className="container">
          <div className="banner-grid">
            <div className="info-banner">
              <span className="banner-icon">🚚</span>
              <div>
                <h3>Free Delivery</h3>
                <p>On orders above ₹500</p>
              </div>
            </div>
            <div className="info-banner">
              <span className="banner-icon">⭐</span>
              <div>
                <h3>Quality Guarantee</h3>
                <p>100% organic products</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
