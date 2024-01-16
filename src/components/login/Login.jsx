import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import Register from './Register';

async function loginUser(credentials) {
 return fetch('https://granite-solutions-service.trentonrush.com/auth/login', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Basic ${credentials}`
   }
 })
   .then(data => data.headers.get('Authorization'))
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser(
      btoa(`${username}:${password}`)
    );
    setToken(token);
  }

  const redirectRegistration = () => {
    return <Register />
  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <button onClick={() => redirectRegistration()}>Register</button>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};