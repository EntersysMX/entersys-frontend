import React from 'react';

/**
 * Skip Link Component
 * Permite a usuarios de teclado/screen readers saltar al contenido principal
 */
const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'absolute',
        top: '-40px',
        left: '0',
        background: '#000',
        color: '#fff',
        padding: '8px 16px',
        textDecoration: 'none',
        zIndex: 9999,
        fontSize: '14px',
        fontWeight: '600',
        transition: 'top 0.2s ease',
      }}
      onFocus={(e) => {
        e.target.style.top = '0';
      }}
      onBlur={(e) => {
        e.target.style.top = '-40px';
      }}
    >
      Saltar al contenido principal
    </a>
  );
};

export default SkipLink;
