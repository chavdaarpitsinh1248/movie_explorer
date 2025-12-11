import React from 'react';
import ReactDom from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { WatchlistProvider } from './context/WatchlistContext.jsx';

ReactDom.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WatchlistProvider>
      <App />
    </WatchlistProvider>
  </React.StrictMode>
);
