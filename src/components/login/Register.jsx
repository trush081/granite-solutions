import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Login.css';

async function registerUser(credentials) {
 fetch('https://granite-solutions-service.trentonrush.com/auth/register', {
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(credentials)
 }).then((response) => {
  if (response.ok) {
    useNavigate("/account")
  }})
}

export default function Register() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    await registerUser({username: username, password: password});
  }

  return(
    <div className="login-wrapper">
      <h1>Register Here</h1>
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
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  )
}
