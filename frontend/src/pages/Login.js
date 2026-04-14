import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="login-container">

      <div className="login-left">
        <h1>HRWMS</h1>
        <p>
          Smart Hospital Resource & Ward Management System.
          Secure. Scalable. Efficient.
        </p>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Login to continue</p>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="admin@hospital.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" type="submit" onClick={handleLogin}>
            Login
          </button>

          <p className="bottom-text">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

    </div>
  );
}

export default Login;