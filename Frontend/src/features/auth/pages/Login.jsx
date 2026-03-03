import React from "react";
import { Link } from "react-router";
import "../style/login.scss";

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to continue</p>

        <form>
          <input
            type="text"
            placeholder="Username or Email"
            name="user"
            required
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don’t have an account?
          <Link to="/register"> Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;