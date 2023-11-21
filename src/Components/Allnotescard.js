import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { deleteNote } from '../helper/Noteshelper.js';
import DeleteIcon from '@mui/icons-material/Delete';
import Navbar from './Navbar/Navbar.js';
import { Link, NavLink } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';

function Allnotescard() {
    const [noteList, setNoteList] = useState([])

    useEffect(() => {

        const intervalId = setInterval(() => {
            axios.get(`https://notes-taking-app-i0ij.onrender.com/api/get/notes`).then((res) => {
                console.log(res.data)
                setNoteList(res.data.notes)
            }).catch((err) => console.log(err))
        }, 1000);
    }, [])
    const handleDelete = (id) => {
        deleteNote(id).then((res) => console.log(res)).catch((err) => console.log(err))
    }
    return (
        <div>
            <Navbar />
            <div className='home'>
                <h1 className='homenotes'>Notes</h1>
                <Link to='/create'>
                    <button className='Addbtn'><span style={{ fontWeight: '500', fontSize: "25px" }}>+</span></button>
                </Link>
                {!noteList || (noteList.length === 0 && (
                    <h2 className='NoNotesFound'>No Notes Found</h2>
                ))}
                <div className='noteList'>
                    {noteList && noteList.map((note, index) => (
                        <>
                            <div className='Note' key={index}>
                                <div className='Notecontent'><h6>
                                    {note.title}</h6>
                                    <p>{note.note.length > 20 ?
                                        `${note.note.substring(0, 20)}...` : note.note
                                    }</p>
                                </div>
                                <div>
                                    <span className='Deleteicon' onClick={() => handleDelete(note._id)}>
                                        <DeleteIcon />
                                    </span>
                                    <NavLink to={`/update/${note._id}`}>
                                        <EditIcon />
                                    </NavLink>
                                </div>

                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Allnotescard;