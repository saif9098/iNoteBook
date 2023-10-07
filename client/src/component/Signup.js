import React ,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Box,TextField} from "@mui/material";
import {Component,SignupButton,Text,LoginButton,Wrapper,Image} from './LoginCss.js'


const Signup = (props) => {
        const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword: ""}) 
        let navigate = useNavigate();

        const handleSubmit = async (e) => {
            e.preventDefault();
            const {name,email,password}=credentials;
            const response = await fetch("http://localhost:4000/api/auth/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name,email,password})
            });
            const json = await response.json()
            console.log(json);
            if (json.success){
                // Save the auth token and redirect
                localStorage.setItem('token', json.authtoken); 
               navigate('/')
               props.showAlert("Account created successfully","success")
    
            }
            else{
                props.showAlert("Invalid credentials","danger");
            }
        }
    
        const onChange = (e)=>{
            setCredentials({...credentials, [e.target.name]: e.target.value})
        }
        const navigateToLogin = ()=>{
            navigate('/login')
        }
    return (
       /* <div className='mt-2'>
        <h2> Signup to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id ="name" value={credentials.name} onChange={onChange} name="name" minLength={4} />
                </div>
               
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  value={credentials.email} onChange={onChange} id="email" name="email" minLength={7} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"   value={credentials.password} onChange={onChange} name="password" id="password" minLength={4} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">confirm Password</label>
                    <input type="password" className="form-control"  value={credentials.password} onChange={onChange} name="cpassword" id="cpassword" minLength={4} />
                </div>

                <button disabled={credentials.email.length<7||credentials.password.length<4} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>*/
        <Component>
        <Box >
        
        <Wrapper>
        <TextField variant="standard" onChange={onChange} value={credentials.name} name="name" label='Name' />
        <TextField variant="standard" onChange={onChange} value={credentials.email} name="email" label='Username' />
         <TextField variant="standard" onChange={onChange} value={credentials.password} name="password" label='Password' />

       
        <SignupButton variant="contained" disabled={credentials.email.length<7||credentials.password.length<4} onClick={handleSubmit} >Signup</SignupButton>
        <Text style={{ textAlign: 'center' }}>OR</Text>
        <LoginButton variant="contained" onClick={navigateToLogin} >Already have an account</LoginButton>
        </Wrapper>
        </Box>
        </Component>

    )
}

export default Signup
