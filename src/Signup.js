import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("hello")
        const user = {
            username, 
            password
        }
    }

    return (
        <div className='login-container'>
            <div className='logintitle'>Signup</div>
            <form className='loginform' onSubmit={handleSubmit}>
                
                    <input 
                    placeholder='Username'
                        type="text" 
                    />
               
                    <input 
                    placeholder='Password'
                        type="text" 
                    />
               
                <button className='loginbutton' type="submit">Sign Up</button>
            </form>
            <div className='backbutton'><Link to='/'>Back to home page</Link></div>
        </div>
    )
}

export default Signup;