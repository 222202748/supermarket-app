import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHeart, FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { getCartCount } = useContext(CartContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span>📞 Call us: </span>
              <span>✉️ support@supermarket.com</span>
            </div>
            <div className="top-bar-links">
              {isAuthenticated ? (
                <>
                  <span>Welcome, {user?.name}!</span>
                  <button onClick={handleLogout} className="link-btn">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <Link to="/" className="logo">
              <FaShoppingBasket className="logo-icon" />
              <h1><span className="logo-market">Sanjana</span> <span className="logo-super">Super</span><span className="logo-market">Market</span></h1>
            </Link>

            {/* Search Bar */}
            <form className="search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FaSearch />
              </button>
            </form>

            {/* Header Icons */}
            <div className="header-icons">
              {isAuthenticated && (
                <>
                  <Link to="/wishlist" className="icon-link">
                    <FaHeart />
                    <span>Wishlist</span>
                  </Link>
                  <Link to="/cart" className="icon-link cart-icon">
                    <FaShoppingCart />
                    <span>Cart</span>
                    {getCartCount() > 0 && (
                      <span className="cart-badge">{getCartCount()}</span>
                    )}
                  </Link>
                  <Link to="/profile" className="icon-link">
                    <FaUser />
                    <span>Profile</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="container">
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products?category=fruits" onClick={() => setMobileMenuOpen(false)}>Fruits & Vegetables</Link></li>
            <li><Link to="/products?category=dairy" onClick={() => setMobileMenuOpen(false)}>Dairy</Link></li>
            <li><Link to="/products?category=fresh-meat" onClick={() => setMobileMenuOpen(false)}>Fresh Meat</Link></li>
            <li><Link to="/products?category=frozen" onClick={() => setMobileMenuOpen(false)}>Grocery & Frozen</Link></li>
            <li><Link to="/products?category=bakery" onClick={() => setMobileMenuOpen(false)}>Bread & Bakery</Link></li>
            <li><Link to="/products?category=fish" onClick={() => setMobileMenuOpen(false)}>Fresh Fish</Link></li>
            {isAuthenticated && (
              <li><Link to="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link></li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
