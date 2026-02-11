import React from 'react';

const Privacy = () => {
  return (
    <div className="container" style={{ padding: '50px 20px' }}>
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <div style={{ marginTop: '30px' }}>
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as when you create an account, update your profile, make a purchase, or communicate with us.</p>
        
        <h3>2. How We Use Your Information</h3>
        <p>We use the information we collect to provide, maintain, and improve our services, process your transactions, and communicate with you.</p>
        
        <h3>3. Information Sharing</h3>
        <p>We do not share your personal information with third parties except as described in this policy.</p>
      </div>
    </div>
  );
};

export default Privacy;
