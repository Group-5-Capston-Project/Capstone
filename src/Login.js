import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';


const Login = ({ login })=> {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //
  const [error, setError] = useState('');
  

  const _login = async(ev)=> {
    ev.preventDefault();
    //
    const user = {
      username,
      password
    }


    
    try {
      await login({ username, password });
      navigate('/products')
      
    }
    catch(ev){
      setError(ev.response.data);
      
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

    


    
    
    
    {
      error ? <p>Incorrect Username or Password</p> : null
    }
   
    </div>
  );
}

export default Login;
