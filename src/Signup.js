import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("handlesubmit working")
        
        const user = {
            username, 
            password,
            is_admin: false
        }
        try{
            await axios.post('/api/users', user)
        } catch(error){
            console.log("error")
        }
        alert("You have successfully Registered! Log in with your username and password below!")
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Username: 
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e)=> {setUsername(e.target.value)}}
                    />
                </label>
                <label> Password: 
                    <input
                        type="password" 
                        value={password}
                        onChange={(e)=> {setPassword(e.target.value)}}
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;