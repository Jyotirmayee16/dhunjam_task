// Import React and other necessary modules
import React, { useState } from 'react';
import axios from 'axios';

// Import your CSS file with the styles
import './loginscreen.css';

function LoginScreen({ onLogin }) {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle the login process
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'https://stg.dhunjam.in/account/admin/login',
        {
          username: username,
          password: password,
        }
      );

      onLogin(response.data.data.token);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // JSX for the login form with added CSS classes
  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <div className="input-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="login-button" onClick={handleLogin}>
        Sign In
      </button>
    </div>
  );
}

export default LoginScreen;
