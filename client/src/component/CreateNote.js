import React ,{useContext, useState} from 'react';
import noteContext from '../context/notes/NoteContext';

function AddNote(props) {
    const context = useContext(noteContext);
    const {addNote} = context
    const [note, setNote]= useState({title : "",description:"",tag : ""})
    
    const handleOnClick = (e)=>{
        e.preventDefault();
        addNote(note.title ,note.description,note.tag)
        setNote({title :"",description:"",tag:""})//to empty the datail after clicking add note
        props.showAlert("Note created successfully","success")
    }
    
    const onChange = (e)=>{
      setNote({...note,[e.target.name]:e.target.value})
  
  }
  return (
    <div>
    <div className='container my-3'>
    <form>
    <div className="mb-3">
      <label htmlFor="title" className="form-label">title</label>
      <input type="text" className="form-control" id="title" name = "title" aria-describedby="emailHelp" onChange={onChange} minLength={4} />
      
    </div>
    <div className="mb-3">
      <label htmlFor="description" className="form-label">description</label>
      <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={4} />
    </div>
    <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} minLength={4} />
  </div>
    <button disabled={note.title.length<4||note.description.length<4} type="submit" className="btn btn-primary" onClick={handleOnClick} >Add note</button>
  </form>
    </div>
    </div>
  )
}

export default AddNote
