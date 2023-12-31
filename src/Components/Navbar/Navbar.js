import React from 'react';
import {NavLink, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';

function Navbar() {
       const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username')
        localStorage.removeItem('id')
        setIsLoggedIn(false);
        navigate('/')
        window.location.reload(false)
      };
    return (
        <div>
            <nav className="navbar navbar-dark bg-dark p-1">
                <div className="container-fluid">
                    <NavLink to={'/'}><h1 style={{textDecoration:'none',color:'#f5bf42'}}>Take Notes</h1></NavLink>
                   <div className="d-grid gap-1 d-md-block">
                    {!isLoggedIn ? (
                      <>
                      <NavLink to={'/register'}>
                   <button className="btn btn-outline-warning" type="button">SignUp</button>
                   </NavLink>
                   <NavLink to={'/login'}>
                   <button className="btn btn-outline-warning m-1" type="button">SignIn</button>
                   </NavLink> 
                      </>
                    ):(
                        <>
                        <NavLink to={'/allnotes'} >
                        <button className="btn btn-outline-warning" type="button" >Notes</button>
                        </NavLink>
                        <button className="btn btn-outline-warning m-1" type="button" onClick={handleLogout}>Logout</button> 
                        </>
                    )}
                         
                   </div>
                       
                </div>
            </nav>
        </div>
    )
}

export default Navbar