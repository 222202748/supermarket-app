import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaHeart, FaSearch, FaBars, FaTimes, FaTachometerAlt, FaShoppingBasket } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import './Header.css'; // Reusing Header styles for now

const Navbar = () => {
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
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            {/* Removed contact info and login/register/logout from here */}
          </div>
        </div>
      </div>
            <li className="nav-contact-info-right">
              <span>📞 Call us: +1 234 567 890</span>
              <span style={{ marginLeft: '1em' }}>✉️ support@supermarket.com</span>
            </li>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-content">

            {/* Logo */}
            <Link to="/" className="logo" title="Sanjana SuperMarket">
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
                    <span className="icon-label">Wishlist</span>
                  </Link>
                  <Link to="/cart" className="icon-link cart-icon">
                    <FaShoppingCart />
                    <span className="icon-label">Cart</span>
                    {getCartCount() > 0 && (
                      <span className="cart-badge">{getCartCount()}</span>
                    )}
                  </Link>
                  <Link to="/profile" className="icon-link">
                    <FaUser />
                    <span className="icon-label">Profile</span>
                  </Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin/dashboard" className="icon-link">
                      <FaTachometerAlt />
                      <span className="icon-label">Admin</span>
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className={`main-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="container">
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setMobileMenuOpen(false)}>Products</Link></li>
            <li><Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
            <li><Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link></li>
            {isAuthenticated && (
              <li><Link to="/orders" onClick={() => setMobileMenuOpen(false)}>My Orders</Link></li>
            )}
            {/* Auth links moved here */}
            {isAuthenticated ? (
              <>
                <li className="nav-user">Welcome, {user?.name}!</li>
                <li><button onClick={handleLogout} className="link-btn nav-btn logout-bold-white">Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                <li><Link to="/register" onClick={() => setMobileMenuOpen(false)}>Register</Link></li>
              </>
            )}
            <li className="nav-contact-info-right">
              <span>📞 Call us: +1 234 567 890</span>
              <span style={{ marginLeft: '1em' }}>✉️ support@supermarket.com</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
