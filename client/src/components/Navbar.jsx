import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{
      background: 'rgba(255,255,255,0.05)',
      backdropFilter: 'blur(10px)',
      padding: '18px 30px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}>
          📰 Fake News Detector
        </h1>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/history" style={{
          color: 'rgba(255,255,255,0.7)',
          textDecoration: 'none',
          fontSize: '0.95rem',
          padding: '6px 16px',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.2)',
          transition: 'all 0.3s'
        }}>
          📚 History
        </Link>
        <span style={{
          background: 'linear-gradient(135deg, #f093fb, #f5576c)',
          color: 'white',
          padding: '5px 14px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          fontWeight: 'bold'
        }}>
          AI Powered ✨
        </span>
      </div>
    </nav>
  );
};

export default Navbar;