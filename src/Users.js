import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar'





const Users = ({ users, auth})=> {
  
  const navigate = useNavigate();
  return (
    <div>
      <h2>Users</h2>
      
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

    </div>
    
  );
};

export default Users;