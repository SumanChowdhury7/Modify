import React from "react";
import { Link, useNavigate } from "react-router";
import "../style/login.scss";
import { useAuth } from "../hooks/useAuth"
import { useState } from "react";

const Login = () => {
const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")

  const {handleLogin, loading} = useAuth()

  const navigate =useNavigate()

  if(loading){
    return (
      <main>
      <h2>Loading....</h2>
      </main>
    )
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();

  handleLogin(identifier, password)
  .then(res=>{
    console.log(res)
    navigate("/detect-face")
  })    
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleFormSubmit}> 
          <input
          onChange={(e)=>{
            setIdentifier(e.target.value)
          }}
            type="text"
            placeholder="Username or Email"
            name="identifier"
            required
          />

          <input
          onChange={(e)=>{
            setPassword(e.target.value)
          }}
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