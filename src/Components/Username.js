import React, { useEffect} from 'react';
import '../Styles/Username.css'
import { Link,useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Toaster } from 'react-hot-toast';
import { usernameValidate } from '../helper/Validate';
import { useDispatch, useSelector } from 'react-redux';

function Username() {
  const navigate=useNavigate()
  const dispatch = useDispatch();
  const username = useSelector((state) => state.username);
  
  const formik = useFormik({
    initialValues:{
      username:''
    },
    validate: usernameValidate,
    validateOnBlur:false,
    validateOnChange:false,
    onSubmit: values =>{  
      dispatch({ type: 'SET_USERNAME', payload: values.username });
      localStorage.setItem("username",values.username);
      navigate('/password')
    }
  })
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/home')
    }
  },[])
    
  return (
    
    <div className='model'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='Maindiv'>  
       <div className='text'>
        <h1>Login</h1>
       </div>
      <div className='imageDiv'>
        <img  src="https://png.pngtree.com/png-vector/20201203/ourmid/pngtree-businessman-icon-vector-and-glyph-png-image_2499766.jpg" alt='' />
      </div>
      <div className='form-div'>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label" placeholder='Enter Email'>Username</label>
            <input {...formik.getFieldProps('username')} placeholder='Username' type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your username with anyone else.</div>
          </div>
          <div className='button-div'>
          <button type="submit" className="btn btn-primary" >Lets go</button>
          </div>
          <div className='button-div'><p>Not a member? <span><Link to='/register' >Register Now</Link></span></p>
          </div>
          
        </form>
      </div>
    </div>
    </div>
  )
}

export default Username