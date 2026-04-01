import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/Constants';
import Button from '../Common/Button';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('rememberMe');
    setIsLoggedIn(false);
    closeMenu();
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={ROUTES.HOME} className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">🏥</span>
          StayHealthy
        </Link>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to={ROUTES.HOME} className="nav-link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.DOCTORS} className="nav-link" onClick={closeMenu}>
              Doctors
            </Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.APPOINTMENTS} className="nav-link" onClick={closeMenu}>
              Appointments
            </Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.REVIEWS} className="nav-link" onClick={closeMenu}>
              Reviews
            </Link>
          </li>
          <li className="nav-item">
            <Link to={ROUTES.PROFILE} className="nav-link" onClick={closeMenu}>
              Profile
            </Link>
          </li>
        </ul>

        <div className="nav-buttons">
          {isLoggedIn ? (
            <Button
              variant="danger"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={closeMenu}
                >
                  Login
                </Button>
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={closeMenu}
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        <div className="hamburger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
