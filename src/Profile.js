import React from 'react';
import { useState, useEffect } from 'react'; 
import axios from 'axios';
import api from './api';


const Profile = () => {
    const [users, setUsers] = useState([])
    const [username, setUsername] = ('')
    const [password, setPassword] = ('')

 
    useEffect(()=> {
        const fetchData = async()=> {
          await api.fetchUsers(setUsers);
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
        <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.username }
              </li>
            );
          })
        }
      </ul>
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