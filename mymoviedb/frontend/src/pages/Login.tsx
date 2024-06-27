import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../components/Navbar';
import { login } from '../services/myMovieService';
import { Button, Form, InputGroup } from 'react-bootstrap';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({username, password});
      if (response.success) {
        localStorage.setItem('token', response.token);
        navigate('/');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed: An unexpected error occurred');
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container mt-4">
        <h1>Login</h1>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Password</InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" onClick={handleLogin}>Login</Button>
      </div>
    </div>
  );
};

export default Login;
