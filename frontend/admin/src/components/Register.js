import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
  
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    companyName: '',
    email: '',
    phone: '',
    password: '',
    cpassword: ''
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { companyName, email, phone, password, cpassword } = user;

    try {
      const res = await fetch('/adminRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyName, email, phone, password, cpassword
        })
      });

      const data = await res.json();

      if (res.status === 201) {
        localStorage.setItem('token', data.token);
        window.alert('Successful Registration');
        navigate('/');
      } else {
        window.alert(`Registration Failed: ${data.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      window.alert('Registration Failed due to network error');
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-12 col-md-7 col-sm-6'>
          <h1>Welcome!</h1>
        </div>
        <div className='col-12 col-md-5 col-sm-6'>
          <form method='POST'>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input type="text" className="form-control" id="companyName" name="companyName" value={user.companyName} onChange={handleInputs} placeholder="Enter your name" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleInputs} placeholder="Enter your Email" />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone No.</label>
              <input type="tel" className="form-control" id="phone" name="phone" value={user.phone} onChange={handleInputs} placeholder="Enter your Phone No." />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleInputs} placeholder="Enter your Password" />
            </div>

            <div className="form-group">
              <label htmlFor="cpassword">Confirm password</label>
              <input type="password" className="form-control" id="cpassword" name="cpassword" value={user.cpassword} onChange={handleInputs} placeholder="Confirm password" />
            </div>
            <NavLink to='/login'>Already Registered, then Login here!</NavLink><br /><br />
            <button type="submit" className="btn btn-primary" id='register' name='register' onClick={PostData}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
