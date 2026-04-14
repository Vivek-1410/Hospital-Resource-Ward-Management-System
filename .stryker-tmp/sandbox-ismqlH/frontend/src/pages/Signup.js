// @ts-nocheck
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../signup.css"; 

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      alert("Signup successful! Please login.");
      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="signup-container">
      {/* Left Side: Branding */}
      <div className="signup-left">
        <h1>Join Us.</h1>
        <p>Create an account to start managing your projects and collaborating with your team.</p>
      </div>

      {/* Right Side: Form */}
      <div className="signup-right">
        <div className="signup-card">
          <h2>Create Account</h2>
          <p className="subtitle">Please enter your details</p>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="signup-btn" onClick={handleSignup}>
            Sign Up
          </button>

          <div className="bottom-text">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;