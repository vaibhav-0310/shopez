import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorMessages = {};

    if (!username) {
      errorMessages.username = 'Enter Username';
    }
    if (!email) {
      errorMessages.email = 'Enter Email';
    }
    if (!role) {
      errorMessages.role = 'Enter Role';
    }
    if (!password) {
      errorMessages.password = 'Enter password';
    } else if (password.length < 8 || password.length > 20) {
      errorMessages.password = 'Password must be between 8 and 20 characters';
    }

    if (Object.keys(errorMessages).length > 0) {
      setErrors(errorMessages);
      return;
    }

    // Sending signup request to backend
    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, role, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Navigate to login or home page on successful signup
        navigate('/login');
      } else {
        // Handle signup failure (e.g. username already taken)
        setErrors({ general: data.message || 'Signup failed' });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrors({ general: 'Something went wrong, please try again' });
    }
  };

  return (
    <div className="row mt-3" style={{ maxWidth: '1500px' }}>
      <h1 className="col-6 offset-3 mb-3">Signup on Kiara</h1>
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
            <label htmlFor="email" className="form-label">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              className="form-control"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <input
              name="role"
              type="text"
              id="role"
              className="form-control"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            <div className="invalid-feedback">{errors.role}</div>
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
            <div className="col-6">
              <p id="passwordHelpInline" className="form-text">
                Must be 8-20 characters long.
              </p>
            </div>
          </div>
          <button className="btn btn-info">SignUp</button>
          {errors.general && <div className="alert alert-danger mt-3">{errors.general}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
