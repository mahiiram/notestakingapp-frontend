import React, { useEffect } from 'react'
import Navbar from './Navbar/Navbar.js'
import Mainpage from './Mainpage.js';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  useEffect(() => {
      navigate('/')
  }, [navigate]);

  return (
    <div>
    <Navbar />
    <Mainpage />
    </div>
  )
}

export default Home