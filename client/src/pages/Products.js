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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const getPageTitle = () => {
    const search = searchParams.get('search');
    const categoryParam = searchParams.get('category');

    if (search) return `Search Results for "${search}"`;
    
    if (categoryParam) {
      if (products.length > 0 && products[0].category && products[0].category.name) {
        return products[0].category.name;
      }
      // Fallback: format slug if it's not an ID
      if (!/^[0-9a-fA-F]{24}$/.test(categoryParam)) {
        return categoryParam.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }
      return 'Category Products';
    }

    return 'All Products';
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-page">
      <div className="container">
        <h1 className="section-title">{getPageTitle()}</h1>
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
