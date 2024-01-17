import React, { useState } from 'react';


const Login = ({ login })=> {
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
      
    }
    catch(ev){
      setError(ev.response.data);
      
    }
  }
  return (
    //
    <div>
    
    <form onSubmit={ _login }>
      <input
        placeholder='username'
        value={ username }
        onChange={ ev => setUsername(ev.target.value)}
      />
      <input
        type='password'
        placeholder='password'
        value={ password }
        onChange={ ev => setPassword(ev.target.value)}
      />
      <button disabled={!username || !password}>Login</button>
    </form>
    {
      error ? <p>Incorrect Username or Password</p> : null
    }
   
    </div>
  );
}

export default Login;
