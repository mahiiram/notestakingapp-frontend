import React, { useEffect, useState } from 'react';
import '../Styles/Mainpage.css';
import women from '../Components/Women.png'
import Notestake from './Notestake';
import WhyNotes from './WhyNotes';

function Mainpage() {
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
  return (
    <div className='Mainbar'>
      <div className='sidebar'>
        <div className="card bg-transparent border-success mb-3" style={{maxWidth:'25rem'}}>
          <div className="card-body bg-transparent border-success">
            <h5 className="card-title bg-transparent border-success">Taking Notes</h5>
            <p className="card-text bg-transparent border-success">If You Aren't Taking Notes, You Aren't Learning</p>
          </div>
        </div>
        <img className='Imagetag' src={women}  alt=''/>
      </div>
      <div className='main-content'>
        {!isLoggedIn ? (
          <>
           <WhyNotes />
         
          </>
        ):(
          <>
          <Notestake />
          </>
        )}
         
      </div>
    </div>
  )
}

export default Mainpage