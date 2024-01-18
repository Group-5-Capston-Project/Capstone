import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import api from './api';


const Profile = () => {
    const [username, setUsername] = useState({})
    const [password, SetPassword] = useState({})

 
    useEffect(()=> {
        const fetchData = async()=> {
          await api.fetchUsers(setUsername);
        };
        fetchData();
      }, []);
    

    const handleSubmit = (e) => {
        // attempting to update profile settings upon form submit
        e.preventDefault()
        console.log(username)
    }
    

return(
    <>
    <div>
        <h2>Profile</h2>
        <h3>Settings</h3>
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type='text' placeholder='Change Username...'></input>
            <label>Password:</label>
            <input type='password' placeholder='Change Password...'></input>
            <button type='submit'>Submit Changes</button>
            </form>
    </div>
    </>
)

}

export default Profile