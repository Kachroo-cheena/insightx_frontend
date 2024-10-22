import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Hide Navbar for Login and Register routes
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';
  
  return (
    <div>
      {/* Conditionally render Navbar */}
      {!hideNavbar && <Navbar />}
      
      {/* Main content */}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
