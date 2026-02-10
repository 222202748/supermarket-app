import React from 'react';

const About = () => {
  return (
    <div className="about-page" style={{ padding: '60px 0', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <h1 style={{ color: '#2c3e50', marginBottom: '20px', textAlign: 'center' }}>About Us</h1>
          
          <div style={{ lineHeight: '1.8', color: '#555' }}>
            <p style={{ marginBottom: '20px' }}>
              Welcome to <strong>FreshMarket</strong>, your number one source for all things grocery. We're dedicated to providing you the very best of fresh vegetables, fruits, daily essentials, and more, with an emphasis on quality, freshness, and timely delivery.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              Founded in 2024, FreshMarket has come a long way from its beginnings. When we first started out, our passion for "Farm to Table" drove us to start our own business.
            </p>
            
            <p style={{ marginBottom: '20px' }}>
              We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>
            
            <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
              <div>
                <h3 style={{ color: '#32CD32', fontSize: '2rem', margin: '0 0 10px' }}>10k+</h3>
                <p>Happy Customers</p>
              </div>
              <div>
                <h3 style={{ color: '#32CD32', fontSize: '2rem', margin: '0 0 10px' }}>500+</h3>
                <p>Products</p>
              </div>
              <div>
                <h3 style={{ color: '#32CD32', fontSize: '2rem', margin: '0 0 10px' }}>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
