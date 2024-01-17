import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';

import "./assets/styles/button.css";
import "./assets/styles/loading.css";
import "./assets/styles/alerts.css";
import "./assets/styles/google.css";
import "./pages/auth/auth.css"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
