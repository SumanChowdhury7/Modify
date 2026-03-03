import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../style/register.scss";
import { useAuth } from "../hooks/useAuth"

const Register = () => {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {handleRegister, loading} = useAuth()
  const navigate = useNavigate()
  if(loading){
    return (
      <main>
      <h2>Loading....</h2>
      </main>
    )
  }

  const handleFormSubmit = async(e)=>{
    e.preventDefault()

   await handleRegister(username,email,password)
    .then(res=>{
    console.log(res)
    navigate("/");
  }) 
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h1>Welcome Back</h1>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleFormSubmit}>
          <input
          onChange={(e)=>{
            setUsername(e.target.value)
          }}
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        <input
        onChange={(e)=>{
          setEmail(e.target.value)
        }}
            type="email"
            placeholder="Email"
            name="email"
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

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="register-text">
          Already have an account.
          <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;