import React from 'react';

/**
 * Simple Loader Component
 * Loader con logo de Entersys centrado y responsive
 */
const SimpleLoader = () => {
  return (
    <div className="simple-loader-container">
      {/* Logo de Entersys con spinner integrado */}
      <div className="simple-loader-content">
        {/* Spinner circular alrededor del logo */}
        <div className="simple-loader-spinner" />

        {/* Logo en el centro */}
        <img
          src="/imago-logo_entersys.png"
          alt="Entersys"
          className="simple-loader-logo"
        />
      </div>

      {/* CSS con media queries para responsive */}
      <style>{`
        .simple-loader-container {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background-color: #ffffff !important;
          z-index: 9999 !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
        }

        .simple-loader-content {
          position: relative !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        .simple-loader-spinner {
          position: absolute;
          width: 220px;
          height: 220px;
          border: 3px solid #f3f3f3;
          border-top: 3px solid #3b82f6;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        .simple-loader-logo {
          width: 180px;
          height: auto;
          animation: pulse 2s ease-in-out infinite;
          z-index: 1;
        }

        /* Responsive para tablets y móviles */
        @media (max-width: 768px) {
          .simple-loader-spinner {
            width: 160px;
            height: 160px;
            border-width: 2.5px;
          }

          .simple-loader-logo {
            width: 130px;
          }
        }

        /* Responsive para móviles pequeños */
        @media (max-width: 480px) {
          .simple-loader-spinner {
            width: 120px;
            height: 120px;
            border-width: 2px;
          }

          .simple-loader-logo {
            width: 100px;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  );
};

export default SimpleLoader;
