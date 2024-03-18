import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

async function loginUser(credentials) {
  return fetch(`${process.env.BACKEND_URL}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response.json();
  })
  .then(data => data.token);
}

async function registerUser(credentials) {
  // Implement the registration logic here
  // Example: use fetch to register a new user
  return fetch(`${process.env.BACKEND_URL}/user/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  .then(response => response.ok)
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setRegistering] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (isRegistering) {
      // Call registration function
      await registerUser({ username, password });
      setRegistering(false);
    } else {
      // Call login function
      const token = await loginUser({ username, password });
      setPassword('');
      setToken(token);
    }
  }

  const redirectRegistration = () => {
    setRegistering(!isRegistering);
  }

  return (
    <div className="login-wrapper">
      <h1>{isRegistering ? 'Register' : 'Please Log In'}</h1>
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
          <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        </div>
      </form>
      <button onClick={() => redirectRegistration()}>
        {isRegistering ? 'Back to Login' : 'Register'}
      </button>
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};