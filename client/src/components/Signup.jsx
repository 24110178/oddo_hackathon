import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    country: '',
  });
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        if (!response.ok) throw new Error('Failed to load countries.');
        const data = await response.json();
        const sortedCountries = data.map(c => c.name.common).sort();
        setCountries(sortedCountries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountries();
  }, []); // The empty array means this effect runs only once

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add Supabase signup logic here
    console.log('Signup attempt:', formData);
    setMessage({ type: 'success', text: 'Account created! Please log in.' });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Your Company Account</h2>
        {message && <div id="message-area" className={`message-${message.type}`}>{message.text}</div>}
        <div className="input-group">
          <label htmlFor="companyName">Company Name</label>
          <input type="text" id="companyName" name="companyName" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="email">Your Email (Admin)</label>
          <input type="email" id="email" name="email" onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={handleChange} required minLength="6" />
        </div>
        <div className="input-group">
          <label htmlFor="country">Country</label>
          <select id="country" name="country" onChange={handleChange} required>
            <option value="">{countries.length ? 'Select a country' : 'Loading...'}</option>
            {countries.map(countryName => (
              <option key={countryName} value={countryName}>{countryName}</option>
            ))}
          </select>
        </div>
        <button type="submit">Create Account</button>
        <p className="form-switch">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;