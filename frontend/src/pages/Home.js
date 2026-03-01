import React from "react";
import { Link } from "react-router-dom";
import "../home.css";

function Home() {
  return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HRWMS</div>
        <div>
          <Link to="/login" className="nav-btn">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Smart Hospital Resource Management</h1>
        <p>
          Efficiently manage wards, beds, patients, and hospital resources 
          with real-time insights and secure digital workflows.
        </p>
        <Link to="/signup" className="primary-btn">
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Core Features</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Ward & Bed Management</h3>
            <p>Track availability and manage occupancy in real-time.</p>
          </div>

          <div className="feature-card">
            <h3>Patient Admission Workflow</h3>
            <p>Structured admission and discharge process.</p>
          </div>

          <div className="feature-card">
            <h3>Role-Based Access</h3>
            <p>Secure access for Admin, Doctors and Staff.</p>
          </div>

          <div className="feature-card">
            <h3>Reports & Analytics</h3>
            <p>View occupancy statistics and operational data.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Hospital Resource & Ward Management System</p>
      </footer>

    </div>
  );
}

export default Home;