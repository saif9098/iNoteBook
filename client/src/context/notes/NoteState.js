import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const host = "http://localhost:4000"
   const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    const getNotes = async () => {
        //api call
        let response = await fetch(`${host}/api/notes/fetchallnotes`, {
           method: 'GET',
           headers: {
               'Content-type': 'application/json',
               'auth-token': localStorage.getItem('token')
           }
           // Fetch is a js tool (js internally call it api) used to integrate api.there are also some other methods(module) to integrate api .

       })
       const json = await response.json()
       setNotes(json)
    }
       
    //add a note API call
    const addNote = async (title,description,tag) => {
         //api call
         let response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body:  JSON.stringify({title,description,tag})
        
       
            // Fetch is a js tool (js internally call it api) used to integrate api.there are also some other methods(module) to integrate api .

        });
        const note= await response.json();
        console.log(notes.concat(note));
       
    }

    //delete a note
    const deleteNote = async (id) => {
        //api call
        let response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            // Fetch is a js tool (js internally call it api) used to integrate api.there are also some other methods(module) to integrate api .

        })
        const json = response.json()
        console.log(json)

        console.log("deleting" + id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // update note
    const editNote = async (id, title, description, tag) => {
        //api call
        let response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title,description,tag}),
            headers: {
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            // Fetch is a js tool (js internally call it api) used to integrate api.there are also some other methods(module) to integrate api .

        })
        const json = await response.json()
        console.log(json)

        let newNotes =JSON.parse(JSON.stringify(notes))
        //logic to edit note
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                newNotes[index].title = title
                newNotes[index].description = description
                newNotes[index].tag = tag
                break;
            }
             
        }
       setNotes(newNotes)
    }
    
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState



