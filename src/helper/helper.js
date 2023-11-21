import axios from 'axios';

/** Make API Requests */



/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('http://localhost:5000/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser(){
    // try {
    //     const { data } = await axios.get(`http://localhost:5000/api/user/${username}`);
    //     return { data };
    // } catch (error) {
    //     return { error : "Password doesn't Match...!"}
    // }
    try {
        const username = localStorage.getItem('username')
        const data = await axios.get(`http://localhost:5000/api/user/${username}`).catch((err)=>console.log(err))
        return data;
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }

    
}

/** register user function */
export async function registerUser(values) {
    try {
      const res = await axios.post(`http://localhost:5000/api/register`, {
        username: values.username,
        email: values.email,
        password: values.password,
        profile: values.profile,
      }).catch((err)=>console.log(err))
      console.log(res)
      let { username, email } = values;
  
      if (res.data.status === true) {
        await axios.post('http://localhost:5000/api/registerMail', {
          username,
          userEmail: email,
          text: res.msg, // Assuming the response data contains a 'msg' property
        });
      }
  
      return Promise.resolve(res.msg); // Assuming the response data contains a 'msg' property
    } catch (err) {
      console.log(err);
      return Promise.reject('Unexpected error occurred');
    }
  }

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('http://localhost:5000/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(response){
    try {
        
        const token =localStorage.getItem('token');
        const data = await axios.put('http://localhost:5000/api/updateuser', response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('http://localhost:5000/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('http://localhost:5000/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('http://localhost:5000/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('http://localhost:5000/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}