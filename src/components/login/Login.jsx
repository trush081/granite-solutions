import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

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

async function registerUser(credentials) {
  // Implement the registration logic here
  // Example: use fetch to register a new user
  return fetch('https://granite-solutions-service.trentonrush.com/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  .then(response => response.json())
}

export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setRegistering] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (isRegistering) {
      // Call registration function
      const token = await registerUser({ username, password });
      setToken(token);
    } else {
      // Call login function
      const token = await loginUser(btoa(`${username}:${password}`));
      setToken(token);
    }
  }

  const redirectRegistration = () => {
    setRegistering(true);
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