import React from "react";
import { useState, useEffect } from "react";

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
        <div>
            <form onSubmit={handleSubmit}>
                <label> Username: 
                    <input 
                        type="text" 
                    />
                </label>
                <label> Password: 
                    <input 
                        type="text" 
                    />
                </label>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default Signup;