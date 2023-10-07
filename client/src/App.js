import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Navbar from "./component/Navbar"
import About from './component/About';
import Home from './component/Home';
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import Signup from './component/Signup';
import Login from './component/Login';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const styles = {
    backgroundImage: 'url("https://images.freecreatives.com/wp-content/uploads/2016/03/White-Abstract-Wallpaper-1.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  };
  const auth = localStorage.getItem('token')

 
  return (

    <>
      <div style={styles}>
        <NoteState>
          <Router>
         {auth? <Navbar/>: <Navigate to ='/login'/>}
            <Alert alert={alert} />
            <div className='container'>
              <Routes>
              
                <Route path="/" element={<Home showAlert={showAlert} />} />
                <Route path="/about" element={<About />} />
                <Route path="/signup" element={<Signup showAlert={showAlert} />} />
                <Route path="/login" element={<Login showAlert={showAlert} />} />
              </Routes>
            </div>
          </Router>
        </NoteState>
      </div>
    </>
  );
}

export default App;
