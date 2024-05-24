import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import Logout from './components/Logout';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes> {/* Wrap your Route components with Routes */}
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;