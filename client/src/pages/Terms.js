import React from 'react';

const Terms = () => {
  return (
    <div className="container" style={{ padding: '50px 20px' }}>
      <h1>Terms & Conditions</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <div style={{ marginTop: '30px' }}>
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        
        <h3>2. Use License</h3>
        <p>Permission is granted to temporarily download one copy of the materials (information or software) on SuperMarket's website for personal, non-commercial transitory viewing only.</p>
        
        <h3>3. Disclaimer</h3>
        <p>The materials on SuperMarket's website are provided "as is". SuperMarket makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
      </div>
    </div>
  );
};

export default Terms;
