import React from 'react';
import ReactDOM from 'react-dom/client';

// Root Component
import App from './App';

// Global Style
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
