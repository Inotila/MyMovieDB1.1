import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Navbar.css';

interface User {
  username: string;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const userData = sessionStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
        console.log('Retrieved user data:', JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error parsing user session data:', error);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Navbar className="custom-navbar" expand="lg">
      <Navbar.Brand className="mx-2" href="/">My Movie DB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto mx-2">
          {user ? (
            <>
              <Navbar.Text className="sign-in-name me-2">
                Signed in: <a href="#login">{user.username}</a>
              </Navbar.Text>
              <Link to="/fav" className="btn btn-outline-primary me-2">Favorites</Link>
              <Link to="/addmovie" className="btn btn-outline-info me-2">Add Movie</Link>
              <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
              <Link to="/register" className="btn btn-outline-secondary">Register</Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
