import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await api.get('/cart');
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      setCart(response.data.cart);
      toast.success('Product added to cart');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
      throw error;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/update/${itemId}`, { quantity });
      setCart(response.data.cart);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update cart');
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const response = await api.delete(`/cart/remove/${itemId}`);
      setCart(response.data.cart);
      toast.success('Item removed from cart');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove item');
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await api.delete('/cart/clear');
      setCart(response.data.cart);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to clear cart');
      throw error;
    }
  };

  const getCartCount = () => {
    return cart.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        fetchCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
