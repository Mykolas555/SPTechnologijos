import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from '../firebase/AuthContext';
import ProtectedRoute from './../firebase/ProtectedRoutes';
import Header from './Header';
import Home from '../pages/Home';
import AboutUs from '../pages/AboutUs';
import Products from '../pages/Products';
import Contacts from '../pages/Contacts';
import Login from '../pages/Login';
import Add from '../pages/Add';

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
          <Route path='/Add' element={ <ProtectedRoute> <Add /> </ProtectedRoute> }/>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;