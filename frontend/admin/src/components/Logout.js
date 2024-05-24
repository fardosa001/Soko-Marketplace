import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const adminLogout = useCallback(async () => {
    const token = localStorage.getItem('token');
    console.log('===>' + token);
    try {
      const res = await fetch('/logoutAdmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          auth: token,
        }),
      });

      const data = await res.json();
      if (res.status === 201) {
        setShow(true);
        localStorage.removeItem('token');
        window.alert('Successfully Logout');
        navigate('/login', { replace: true });
        window.location.reload();
      } else {
        window.alert('Logout failed: ' + data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }, [navigate]);

  useEffect(() => {
    const confirmBox = window.confirm('Do you really want to Logout?');
    if (confirmBox === true) {
      adminLogout();
    } else {
      navigate('/');
    }
  }, [adminLogout, navigate]);

  return <div><h1>{show ? 'Logout Successfully!' : 'Processing...'}</h1></div>;
};

export default Logout;
