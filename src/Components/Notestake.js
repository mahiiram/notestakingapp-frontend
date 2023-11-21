import React, { useEffect, useState } from 'react'
import { Link,NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import "../Styles/Notestake.css"
import { deleteNote } from '../helper/Noteshelper.js';
import EditIcon from '@mui/icons-material/Edit';

function Notestake() {
  const [noteList, setNoteList] = useState([])

  useEffect(() => {
    axios.get(`https://notes-taking-app-i0ij.onrender.com/api/get/notes`).then((res) => {
      console.log(res.data)
      setNoteList(res.data.notes)
    }).catch((err) => console.log(err))
    // const intervalId = setInterval(() => {

    // }, 3000);
  }, [])
  console.log(noteList)

  const handleDelete = (id) => {
    deleteNote(id).then((res) => console.log(res)).catch((err) => console.log(err))
  }
  return (
    <div className='home'>
      <h1 className='homenotes'>Notes</h1>
      <Link to='/create'>
        <button className='Addbtn'>+</button>
      </Link>
      {!noteList || (noteList.length === 0 && (
        <h2 className='NoNotesFound'>No Notes Found</h2>
      ))}
      <div className='noteList'>
        {noteList && noteList.slice(0, 3).map((note, index) => (
          <>
            <div className='Note' key={index}>
              <div className='Notecontent'><h6>
                {note.title}</h6>
                <p>{note.note}</p>
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
  )
}

export default Notestake