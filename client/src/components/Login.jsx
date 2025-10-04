import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add Supabase login logic here
    console.log('Login attempt:', { email, password });
    setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
    setTimeout(() => {
        alert('Redirecting to dashboard (placeholder).');
    }, 1500);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Log In to Your Account</h2>
        {message && <div id="message-area" className={`message-${message.type}`}>{message.text}</div>}
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
        <p className="form-switch">
          New here? <Link to="/signup">Create a Company Account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;