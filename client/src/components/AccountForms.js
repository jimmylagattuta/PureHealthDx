import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import './AccountForms.css';

const AccountForms = ({ toggleLoginForm, toggleSignupForm, signupFormVisible, loginFormVisible, user, setUser }) => {

    return (
    <>
      {signupFormVisible && (
        <div className="signup-form-overlay">
          <SignupForm toggleLoginForm={toggleLoginForm} setUser={setUser} toggleSigninForm={toggleSignupForm} />
          <div className="close-signup-button" onClick={toggleSignupForm}>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      )}

      {loginFormVisible && (
        <div className="login-form-overlay">
          <LoginForm toggleSignupForm={toggleSignupForm} setUser={setUser} toggleLoginForm={toggleLoginForm} />
          <div className="close-login-button" onClick={toggleLoginForm}>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountForms;
