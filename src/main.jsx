import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { setupErrorSuppression, initializeErrorTracking } from './utils/errorHandler'
import { versionManager } from './utils/version.js'
import { versionChecker } from './utils/versionCheck.js'

// Initialize error handling
setupErrorSuppression();
initializeErrorTracking();

// Initialize version management
versionManager.initialize();

// Initialize version checking in production
if (process.env.NODE_ENV === 'production') {
  // Start version checking after app is loaded
  setTimeout(() => {
    versionChecker.startAutoCheck();
  }, 5000);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>,
)