import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

function NoteItem(props) {
    const context = useContext(noteContext)
    const {deleteNote} = context
    const {note,updateNote} = props

    const styles = {
      backgroundImage: 'url("https://lparchive.org/Fatestay-night/Update%20397/28-HF16-21-045.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
  return (
    <div className='col-md-3'>
    <div className="card my-3" >
    
    <div className="card-body"  style={styles}>
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
      <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Note deleted successfully","success")}}></i>
      <i className="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateNote(note)}}></i>
      
    </div>
  </div>
    </div>
  )
}

export default NoteItem;
