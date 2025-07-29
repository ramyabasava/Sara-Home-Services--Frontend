import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home after logout
  };

  // A simple style for the logout button to make it look like a link
  const navLinkButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    fontSize: '1rem',
    fontFamily: 'inherit',
    fontWeight: '500',
    padding: 0,
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Sara <span>Services</span></Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="/#services">Services</a>
        <a href="/#about">About Us</a>
        <a href="/#contact">Contact</a>
        
        {user ? (
          <>
            <span>Welcome, {user.email.split('@')[0]}!</span>
            <button onClick={handleLogout} style={navLinkButtonStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        
        {/* The 'Book a Service' button in the navbar is less necessary now that each card has one, but we can keep it as a shortcut */}
        {/* It will correctly link to /login if the user is not logged in */}
        <Link to={user ? "/" : "/login"} className="nav-btn" onClick={() => !user && alert('Please login to book a service.')}>Book a Service</Link>
      </div>
    </nav>
  );
};

// THIS IS THE MISSING LINE
export default Navbar; 