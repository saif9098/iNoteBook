import React ,{useContext, useEffect,useRef,useState} from 'react';
import noteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';
import AddNote from './CreateNote';
import { useNavigate } from 'react-router-dom';

function Notes(props) {
  const navigate =useNavigate();
    const context = useContext(noteContext);
    const {notes,getNotes,editNote} = context;
    useEffect(()=>{
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
           navigate('/login')
      }
    },[])

const refClose = useRef(null)
const ref = useRef(null)
const [note, setNote]= useState({id:"",etitle : "",edescription:"",etag : ""})

   const updateNote = (currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id, etitle:currentNote.title , edescription:currentNote.description, etag: currentNote.tag})
   }
   const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value})

}


const handleOnClick = (e)=>{
  console.log("updating",note)  
  editNote(note.id,note.etitle,note.edescription,note.etag)
  refClose.current.click();
  props.showAlert("Updated successfully","success")

    
}

return (

    <>
    <div  className='container'>
    <AddNote showAlert={props.showAlert}/>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
  <form className='container'>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">title</label>
    <input type="text" className="form-control" id="etitle" name = "etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
    
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">description</label>
    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
  </div>
  <div className="mb-3">
  <label htmlFor="etag" className="form-label">tag</label>
  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
</div>
  
</form>
       <div className="modal-footer">
      <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" className="btn btn-primary" onClick={handleOnClick}>Update</button>
    </div>
  </div>
</div>
</div>

    
    <div className='row my-3'>
      <h2>your notes</h2>
      <div className='container'>
      {notes.length===0&& 'No notes to display'}
      </div>
      {notes && notes.map((note)=>{return <NoteItem showAlert={props.showAlert} key = {note._id} updateNote ={updateNote} note={note}/>})}
    </div>
    </div>
    
    </>
  )
}

export default Notes
