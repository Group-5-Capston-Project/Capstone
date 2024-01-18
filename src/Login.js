import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Login = ({ login })=> {
  const location = useLocation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const _login = async(ev)=> {
    ev.preventDefault();
    try {
      await login({ username, password });
    }
    catch(ex){
      console.log(ex.response.data);
    }
  }
  return (
    <div className='login-container'>

      
<div className='logintitle'>Login</div>

      <form className='loginform' onSubmit={ _login }>

      <input
        placeholder='Username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
      />
      

      
      <input
        type='password'
        placeholder='Password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      

      <button className='loginbutton' disabled={!username || !password}>Login</button>
    </form>

    <div className='backbutton'><Link to='/'>Back to home page</Link></div>

    


    </div>
    
    
  );
}

export default Login;
