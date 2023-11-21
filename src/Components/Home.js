import React, { useEffect } from 'react'
import Navbar from './Navbar/Navbar.js'
import Mainpage from './Mainpage.js';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const unlisten = navigate(location => {
      // Check if the user navigated to the homepage
      if (location.pathname === '/') {
        console.log('Navigated to the homepage');
      }
    });
    return () => {
      unlisten();
    };
  }, [navigate]);

  return (
    <div>
    <Navbar />
    <Mainpage />
    </div>
  )
}

export default Home