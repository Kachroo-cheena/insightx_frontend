import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for login state
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize from localStorage to persist login state across page reloads
    return !!localStorage.getItem('jwtToken');
  });

  const [jwtToken, setJwtToken] = useState(() => localStorage.getItem('jwtToken') || null);
  const [error, setError] = useState(null);

  // Login function
  const login = async (email, password) => {
    try {
      // Reset any previous errors
      setError(null);

      // Simulate API call (Replace with your login API endpoint)
      const response = await fetch('https://api.insightxai.in/login', {
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
      setError(error.message || 'Login error occurred');
      console.error('Login error:', error);
    }
  };

  // Signup function (optional, modify if needed)
  const signup = async (username, password) => {
    try {
      setError(null);
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
      setError(error.message || 'Signup error occurred');
      console.error('Signup error:', error);
    }
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setJwtToken(null);
    localStorage.removeItem('jwtToken');
  };

  // Auto-logout feature if JWT expires (optional enhancement)
  useEffect(() => {
    if (jwtToken) {
      // You can add token expiration handling here if your API returns expiration info
      // Example: if token is valid for 1 hour, set a timeout to log out the user after that
    }
  }, [jwtToken]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, jwtToken, login, signup, logout, error }}>
      {children}
    </LoginContext.Provider>
  );
};

// Custom hook to use the login context
export const useLogin = () => {
  return useContext(LoginContext);
};
