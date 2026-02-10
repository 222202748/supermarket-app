import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to backend
    console.log('Contact form submitted:', formData);
    toast.success('Message sent successfully! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page" style={{ padding: '60px 0', background: '#f8f9fa' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', maxWidth: '1000px', margin: '0 auto' }}>
          
          <div style={{ background: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Get In Touch</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '5px', resize: 'vertical' }}
                ></textarea>
              </div>
              <button 
                type="submit"
                style={{ background: '#32CD32', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}
              >
                Send Message
              </button>
            </form>
          </div>

          <div style={{ alignSelf: 'center' }}>
            <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Contact Information</h2>
            <div style={{ marginBottom: '30px', lineHeight: '1.6', color: '#555' }}>
              <p>Have questions about our products or services? Feel free to reach out to us using the contact form or the details below.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ width: '40px', height: '40px', background: '#e8f5e9', color: '#32CD32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📍</span>
                <div>
                  <h4 style={{ margin: '0 0 5px', color: '#2c3e50' }}>Address</h4>
                  <p style={{ margin: 0, color: '#7f8c8d' }}>123 Market Street, City, Country</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ width: '40px', height: '40px', background: '#e8f5e9', color: '#32CD32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>📞</span>
                <div>
                  <h4 style={{ margin: '0 0 5px', color: '#2c3e50' }}>Phone</h4>
                  <p style={{ margin: 0, color: '#7f8c8d' }}>+1 234 567 890</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ width: '40px', height: '40px', background: '#e8f5e9', color: '#32CD32', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>✉️</span>
                <div>
                  <h4 style={{ margin: '0 0 5px', color: '#2c3e50' }}>Email</h4>
                  <p style={{ margin: 0, color: '#7f8c8d' }}>info@freshmarket.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
