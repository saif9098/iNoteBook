import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext'

const About = () => {
    const a =useContext(noteContext)
  return (
    <div>
    this is {a.name} from class {a.class}
      
    </div>
  )
}

export default About
