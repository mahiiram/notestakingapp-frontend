import axios from "axios";

export const deleteNote = async(id)=>{
       console.log(id)
    const res = await axios.delete(`https://notes-taking-app-i0ij.onrender.com/api/delete/${id}`).catch((err)=>console.log(err))
    
    if( res.data.status === false){
      return console.log("unexpected err")
    }
    const resdata = await res.data;
    return resdata
}