import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  
  const token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="#" style={{ textDecoration: 'none' }}>
          <b>Soko-Marketplace</b>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mb-2 mb-lg-0" style={{ listStyleType: 'none', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              {token ?

          <>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/" style={{ textDecoration: 'none', margin: '0 10px' }}>Home</NavLink>
              </li>
            
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout" style={{ textDecoration: 'none', margin: '0 10px' }}>Logout</NavLink>
              </li>
          </>
          :
          <>
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/register" style={{ textDecoration: 'none', margin: '0 10px' }}>Register</NavLink>
              </li>
            
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" style={{ textDecoration: 'none', margin: '0 10px' }}>Login</NavLink>
              </li>
          </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
