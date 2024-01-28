import React from 'react';
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from './api';


const Profile = ({ auth, updateUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [is_vip, setIs_Vip] = useState('')  

    

    const handleSubmit = async (e) => {
      e.preventDefault()

      updateUser( {...auth,
        username: username,
        password: password,
        is_vip: false ? !onClick() : true 
      })
      setUsername(''),
      setPassword(''),
      alert('User info successfully updated.')
      window.location.reload(false);


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
            <label> Check here to become a VIP member
              <input
               type='checkbox'
               value={is_vip}
               onClick={() => {
                setIs_Vip(true)
               }}>
              </input>
            </label>
            <button type='submit' disabled={!username || !password}>Submit Changes</button>
            </form>
    </div>
    </>
)

}

export default Profile