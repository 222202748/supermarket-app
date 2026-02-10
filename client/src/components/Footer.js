import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-section">
              <h3>About SuperMarket</h3>
              <p>Your one-stop destination for fresh groceries, vegetables, fruits, dairy products, and more. We deliver quality products right to your doorstep.</p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/products">Shop Now</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/orders">My Orders</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div className="footer-section">
              <h3>Categories</h3>
              <ul>
                <li><Link to="/products?category=fruits">Fruits & Vegetables</Link></li>
                <li><Link to="/products?category=dairy">Dairy</Link></li>
                <li><Link to="/products?category=fresh-meat">Fresh Meat</Link></li>
                <li><Link to="/products?category=bakery">Bread & Bakery</Link></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <div className="contact-item">
                <FaPhone /> <span>(91) 1234567899</span>
              </div>
              <div className="contact-item">
                <FaEnvelope /> <span>support@sanjanasupermarket.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt /> <span>123 Market Street, Chennai, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <p style={{ margin: 0 }}>&copy; 2026 SuperMarket. All rights reserved. | <Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms & Conditions</Link></p>
            <div className="payment-methods" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <span style={{ marginRight: '10px' }}>Payment Partners:</span>
              <img src="/images/payment/amazonpay.svg" alt="Amazon Pay" style={{ height: '30px' }} />
              <img src="/images/payment/american-express.svg" alt="American Express" style={{ height: '30px' }} />
              <img src="/images/payment/mastercard.svg" alt="Mastercard" style={{ height: '30px' }} />
              <img src="/images/payment/paypal.svg" alt="Paypal" style={{ height: '30px' }} />
              <img src="/images/payment/visa.svg" alt="Visa" style={{ height: '30px' }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
