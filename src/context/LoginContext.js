import React, { createContext, useContext, useState } from 'react';

// Create a context for login state
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState(localStorage.getItem('jwtToken') || null);

  const login = async (email, password) => {
    try {
      // Simulate API call (Replace with your login API endpoint)
      const response = await fetch('https://34.234.93.29/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;  // Assuming the API returns a token
        setJwtToken(token);
        setIsLoggedIn(true);
        localStorage.setItem('jwtToken', token); // Save token in localStorage
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await fetch('http://your-api-url.com/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;  // Assuming the API returns a token
        setJwtToken(token);
        setIsLoggedIn(true);
        localStorage.setItem('jwtToken', token); // Save token in localStorage
      } else {
        throw new Error(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setJwtToken(null);
    localStorage.removeItem('jwtToken');
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, jwtToken, login, signup, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the login context
export const useLogin = () => {
  return useContext(LoginContext);
};
