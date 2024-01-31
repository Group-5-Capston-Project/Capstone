import React from 'react';
import { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from './api';


const Profile = ({ auth, updateUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    

    const handleSubmit = async (e) => {
      e.preventDefault()

      updateUser( {...auth,
        username: username,
        password: password,
      })
      setUsername(''),
      setPassword(''),
      alert('User info successfully updated.')
      window.location.reload(false);


    }
    


return(
    <>
    <div className='page-users'>
    <h2 className='pagetitletwo'>Profile Settings</h2>
        <form className='createproductform' onSubmit={handleSubmit}>
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
            <button className='profilebutton' type='submit' disabled={!username || !password}>Submit Changes</button>
            </form>
    </div>
    </>
)

}


export default Profile