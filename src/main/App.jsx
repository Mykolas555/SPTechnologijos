import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from '../firebase/AuthContext';
import ProtectedRoute from '../firebase/ProtectedRoutes';
import Header from './Header';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Products from '../pages/Products';
import Contacts from '../pages/Contacts';
import Login from '../pages/Login';
import Table from '../pages/Table';
import Product from '../pages/Product'; // Assuming this is correctly imported

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/add" element={<ProtectedRoute><Table /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
