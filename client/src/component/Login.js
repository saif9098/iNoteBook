import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Box,TextField} from "@mui/material";
import {Component,SignupButton,Text,LoginButton,Wrapper,Image} from './LoginCss.js'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.authtoken); 
           navigate('/')
           props.showAlert("Logged in successfully","success")
    
        }
        else{
            props.showAlert("Invalid detail","danger");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const navigateToSignup = ()=>{
        navigate('/signup')
    }
    const imgUrl = "https://lh3.googleusercontent.com/Rr0sCrd8AJ9iNweRGKz0k0KU9E_RLJiKWxIkpEm9TOWKGZDlGzRUObyisQJkw39sqH0k"

    return (
       /* <div className='mt-2'>
        <h2> Login to use iNotebook</h2>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>*/
        
        <Component>
        <Box >
        <Image src={imgUrl} alt="blog" />
        <Wrapper>
         <TextField variant="standard" onChange={onChange} value={credentials.email} name="email" label='Username' />
         <TextField variant="standard" onChange={onChange} value={credentials.password} name="password" label='Password' />

        <LoginButton variant="contained" disabled={credentials.email.length<7||credentials.password.length<4} onClick={handleSubmit}>Login</LoginButton>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <SignupButton onClick={navigateToSignup} >create an account</SignupButton>
        </Wrapper>
        </Box>
        </Component>
    )
}

export default Login