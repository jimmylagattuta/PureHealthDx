import React, { useState } from "react";
import './SignupForm.css';

const SignupForm = ({ toggleLoginForm, setUser, toggleSigninForm }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
  });

  const [error, setError] = useState(""); // State to manage error messages
  const [loading, setLoading] = useState(false); // State to manage loading spinner

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error when user starts typing
  };

  const validateEmail = (email) => {
    // Basic email format validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }

    setLoading(true); // Start loading spinner

    const userCreds = { ...formData };

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCreds),
    }).then((res) => {
      setLoading(false); // Stop loading spinner
      if (res.ok) {
        res.json().then((user) => {
          console.log('Signed up', user);
          setUser(user);
          toggleSigninForm();
        });
      } else {
        res.json().then((data) => {
          const errorMessage = data.errors ? data.errors.join(", ") : "An error occurred. Please try again.";
          setError(errorMessage);
        });
      }
    }).catch((err) => {
      setLoading(false); // Stop loading spinner
      console.error('Network error:', err);
      setError("Network error. Please try again.");
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          id="username-signup-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email-signup-input"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password-signup-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password_confirmation">Confirm Password:</label>
        <input
          id="password-confirmation-signup-input"
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`}>
        {loading ? <div className="spinner"></div> : 'Sign Up'}
      </button>
      <button className="signin-btn" type="button" onClick={toggleLoginForm}>
        Already have an account? Sign In
      </button>
    </form>
  );
};

export default SignupForm;
