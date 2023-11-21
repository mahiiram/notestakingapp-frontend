import React, { useEffect, useState } from 'react'
import { useParams, } from 'react-router-dom';
import { useNavigate } from "react-router";
import Navbar from "./Navbar/Navbar.js";
import '../Styles/CreateNote.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function UpdateNote() {
    const navigate = useNavigate();
    const [updatetitle, setTitle] = useState([])
    const [updatenote, setNote] = useState([])
    const id = useParams()
    const paramid = id.id
    useEffect(() => {
        axios.get(`https://notes-taking-app-i0ij.onrender.com/api/get/${paramid}`).then((res) => {
                console.log(res.data)
                setTitle(res.data.notes.title)
                setNote(res.data.notes.note)
            }).catch((err) => console.log(err))
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://notes-taking-app-i0ij.onrender.com/api/update/${paramid}`, {
                title: updatetitle.toString(),
                note: updatenote.toString(),
            })
            toast.success('Note updated successfully!')
            console.log(response.data);
        } catch (error) {
            toast.error('failed... Please try again.'); // Show error toast
            console.log(error);
        }
        if(toast.success){
            navigate('/allnotes')
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
                                <input className="inputtitle" value={updatetitle} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                                <textarea
                                    className="NoteText"
                                    required
                                    placeholder="Place the notes"
                                    value={updatenote}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </div>
                            <button className="CreateNoteBtn" type="submit">
                                update Note
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateNote