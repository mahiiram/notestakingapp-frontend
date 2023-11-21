import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar/Navbar.js";
import '../Styles/CreateNote.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateNote = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [note, setNote] = useState('')
    
    const handleSubmit =async (e)=>{
        e.preventDefault();
        const noteObj={
        title,
        note
      }
      try {
        const response = await axios.post(`https://notes-taking-app-i0ij.onrender.com/api/newNote`, noteObj)
        toast.success('Note posted successfully!')
        console.log(response.data);
      } catch (error) {
        toast.error('failed... Please try again.'); // Show error toast
         console.log(error);
      }
    }
    
      return (
        <>
          <div>
            <Navbar />
            <ToastContainer />
            <div className="CreateForm">
            <div className="FormContent">
                <form onSubmit={handleSubmit}>
                    <div className="NoteForm">
                        <h1 className="TextHead">Note</h1>
                        <input className="inputtitle" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
                        <textarea
                            className="NoteText"
                            required
                            placeholder="Place the notes"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <button className="CreateNoteBtn" type="submit">
                        Create Note
                    </button>
                </form>
            </div>
        </div>
          </div>
        </>
      )
};

export default CreateNote;