import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Register from './components/Register';
import AllOrders from './userPages/AllOrders';
import CartProducts from './userPages/CartProducts';
import Orders from './userPages/Orders';


function App() {

  function googleTranslateElementInit() {
    const google = window.google;
    new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
  }

  return (
    <div style={{ marginLeft: '2%', marginRight: '2%' }}>
      <Navbar />
      <div id="google_translate_element" >
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/cartProducts' element={<CartProducts/>}/>
          <Route path='/orders' element={<Orders/>}/>
          <Route path='/allOrders' element={<AllOrders/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/logout' element={<Logout/>}/>
        </Routes>
        {googleTranslateElementInit}
      </div>
    </div>
  );
}

export default App;