import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext'; // Import your login context

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLogin(); // Get the login status
  console.log("islogin",isLoggedIn)

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If the user is logged in, allow them to access the route
  return children;
};

export default ProtectedRoute;
