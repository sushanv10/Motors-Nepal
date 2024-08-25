import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './talwind.css'; // Ensure this file name is correct
import { AuthProvider } from './Context/Auth';
import { CartProvider } from './Context/Cart.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <CartProvider>
 
    
      <App />
 
  </CartProvider>

  </AuthProvider>
);

// <provider store=(store)>