import React from 'react';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import api from './api';


const Profile = ({users}) => {
    const [username, setUsername] = ('')
    const [password, setPassword] = ('')       
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
          username, 
          password,
          is_admin: false
      }
        try{
          await axios.put(`/api/users/${user.id}`, user)
      } catch(error){
          console.log("error")
      }
    }
    

return(
    <>
    <div>
        <h2>Profile</h2>
        <h3>Settings</h3>
        <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input 
              type='text' 
              placeholder='Change Username...'
              value={username}
              onChange={(e)=> {setUsername(e.target.value)}}>
              </input>
            <label>Password:</label>
            <input 
              type='password' 
              placeholder='Change Password...'
              value={password}
              onChange={(e)=> {setPassword(e.target.value)}}>
            </input>
            <button type='submit'>Submit Changes</button>
            </form>
    </div>
    </>
)

}

export default Profile