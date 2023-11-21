import React from 'react';
import {NavLink } from 'react-router-dom';
import { useState,useEffect } from 'react';

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // Check if token exists in localStorage
      const token = localStorage.getItem('token');
  
      // Update isLoggedIn state based on the presence of the token
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
    const handleLogout = () => {
        // Remove token from localStorage on logout
        localStorage.removeItem('token');
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        setIsLoggedIn(false);
      };
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink to={'/'}><h1>Take Notes</h1></NavLink>
                   <div className="d-grid gap-1 d-md-block">
                    {!isLoggedIn ? (
                      <>
                      <NavLink to={'/register'}>
                   <button className="btn btn-outline-warning" type="button">SignUp</button>
                   </NavLink>
                   <NavLink to={'/login'}>
                   <button className="btn btn-outline-warning" type="button">SignIn</button>
                   </NavLink> 
                      </>
                    ):(
                        <>
                        <NavLink to={'/allnotes'} >
                        <button className="btn btn-outline-warning" type="button" >Notes</button>
                        </NavLink>
                        <button className="btn btn-outline-warning" type="button" onClick={handleLogout}>Logout</button> 
                        </>
                    )}
                         
                   </div>
                       
                </div>
            </nav>
        </div>
    )
}

export default Navbar