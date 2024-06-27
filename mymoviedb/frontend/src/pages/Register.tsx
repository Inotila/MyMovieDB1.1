import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { register } from '../services/myMovieService';
import NavigationBar from '../components/Navbar';
import axios, { AxiosError } from 'axios'; 

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await register({ username, password });
            if (response.success) {
                console.log('Registration successful:', response);
                navigate('/');
            } else {
                setError('Registration failed');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
                setError('Registration failed: ' + error.response.data.message);
            } else {
                setError('Registration failed: An unexpected error occurred');
            }
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="container mt-4">
                <h1>Register</h1>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="username">Username</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="password">Password</InputGroup.Text>
                    <Form.Control
                        placeholder="Password"
                        aria-label="Password"
                        type="password"
                        aria-describedby="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="confirm-password">Confirm Password</InputGroup.Text>
                    <Form.Control
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        type="password"
                        aria-describedby="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </InputGroup>
                {error && <div className="alert alert-danger">{error}</div>}
                <Button variant="primary" onClick={handleRegister}>Register</Button>
            </div>
        </div>
    );
};

export default Register;
