import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorMessages = {};

    if (!username) {
      errorMessages.username = 'Enter Username';
    }
    if (!password) {
      errorMessages.password = 'Enter password';
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    // Sending login request to backend
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to dashboard or home on successful login
        navigate('/home');
      } else {
        // Handle invalid login
        setErrors({ general: data.message || 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrors({ general: 'Something went wrong, please try again' });
    }
  };

  return (
    <div className="row mt-3" style={{ maxWidth: '1500px' }}>
      <h1 className="col-6 offset-3 mb-3">Login on Kiara</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              name="username"
              type="text"
              id="username"
              className="form-control"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="invalid-feedback">{errors.username}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              className="form-control"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <button className="btn btn-info">Login</button>
          {errors.general && <div className="alert alert-danger mt-3">{errors.general}</div>}
        </form>
        <div className="b" style={{ display: 'flex' }}>
          <a href="/auth/google">
            <button className="btn btn-primary" style={{ marginLeft: '0px !important' }}>
              <i className="fa-brands fa-google"></i>&nbsp;&nbsp;Continue with Google
            </button>
          </a>
        </div>
        <br />
        <a href="/signup"><p>New User! SignUp Now!</p></a>
      </div>
    </div>
  );
};

export default Login;
