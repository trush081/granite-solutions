import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    return sessionStorage.getItem('token');
  }

  const removeToken = () => {
    return sessionStorage.removeItem('token');
  }

  const [token, setToken] = useState(getToken());

  const modifyToken = userToken => {
    if (userToken) {
      sessionStorage.setItem('token', JSON.stringify(userToken));
    } else {
      sessionStorage.removeItem('token')
    }
    setToken(userToken);
  }

  return {
    setToken: modifyToken,
    token
  }
}