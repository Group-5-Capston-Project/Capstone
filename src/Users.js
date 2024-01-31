import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';





const Users = ({ users, auth})=> {
  
  const navigate = useNavigate();


  return (
    <div className='page-users'>
      <h2 className='pagetitletwo'>Users ({users.length})</h2>
      
      <ol>
        {
          users.map( user => {
            return (
              <li key={ user.id } className='userscontainer'>

                <p className='username'>{ user.username }</p>
                

                {user.is_admin ? <p>Administrator</p> : null}
                {user.is_vip ? <p>VIP User</p> : null}
                {user.id && !user.is_vip && !user.is_admin ? <p>Regular User</p> : null}
               

              </li>
            );
          })
        }

      </ol>

    </div>
    
  );
};

export default Users;