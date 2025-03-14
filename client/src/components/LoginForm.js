import React, { useState } from "react";
import './SignupForm.css';

const LoginForm = ({ toggleSignupForm, setUser, toggleLoginForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when the user starts typing
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        setLoading(false);
        if (res.ok) {
          res.json().then((user) => {
            console.log('Logged in', user);
            setUser(user);
            toggleLoginForm();
          });
        } else {
          res.json().then((data) => {
            // Check if there's an error message from the server
            if (data.error) {
              setError(data.error);
            } else {
              setError("Login failed. Please check your credentials and try again.");
            }
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error('Network error:', err);
        setError("Network error. Please try again.");
      });
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>} {/* Display error message */}
      <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`}>
        {loading ? <div className="spinner"></div> : 'Login'}
      </button>
      <button className="signin-btn" type="button" onClick={toggleSignupForm}>
        Don't have an account? Sign Up
      </button>
    </form>
  );
};

export default LoginForm;
