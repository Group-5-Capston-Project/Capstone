import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = ({createUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("handlesubmit working")
        
        const user = {
            username, 
            password,
            is_admin: false,
            is_vip: false
        }
        // createUser(user)
        try{
            await axios.post('/api/users', user)
        } catch(error){
            console.log("error")
        }
        alert("You have successfully Registered! Log in with your username and password below!")
    }

    return (
        <div className='login-container'>
            <div className='logintitle'>Signup</div>
            <form className='loginform' onSubmit={handleSubmit}>
                
                    <input 
                    placeholder='Username'
                        type="text" 
                        value={username}
                        onChange={(e)=> {setUsername(e.target.value)}}
                    />
               
                    <input 
                    placeholder='Password'
                        type="password" 
                        value={password}
                        onChange={(e)=> {setPassword(e.target.value)}}
                    />
               
                <button className='loginbutton' type="submit">Sign Up</button>
            </form>
            <div className='backbutton'><Link to='/'>Back to home page</Link></div>
        </div>
    )
}

export default Signup;