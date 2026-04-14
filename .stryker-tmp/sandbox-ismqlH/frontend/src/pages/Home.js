// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";
import { Activity, BedDouble, ShieldCheck, PieChart, ArrowRight } from "lucide-react";
import "../home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <Activity className="logo-icon" size={28} />
          <span>HRWMS</span>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="nav-link">Log in</Link>
          <Link to="/signup" className="nav-btn">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background-glow"></div>
        <div className="hero-content">
          <div className="badge">✨ Next-Gen Healthcare Management</div>
          <h1>Smart Hospital Resource Management</h1>
          <p>
            Efficiently manage wards, beds, patients, and hospital resources 
            with real-time insights and secure, frictionless digital workflows.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="primary-btn">
              Start Free Trial <ArrowRight size={18} />
            </Link>
            <Link to="/demo" className="secondary-btn">
              Book a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>Powerful Core Features</h2>
          <p>Everything you need to run your healthcare facility efficiently.</p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon-wrapper blue-glow">
              <BedDouble size={28} />
            </div>
            <h3>Ward & Bed Management</h3>
            <p>Track live availability, manage occupancy, and optimize patient placement instantly.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper teal-glow">
              <Activity size={28} />
            </div>
            <h3>Patient Workflows</h3>
            <p>Structured, easy-to-use admission, transfer, and discharge processes.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper purple-glow">
              <ShieldCheck size={28} />
            </div>
            <h3>Role-Based Access</h3>
            <p>Enterprise-grade security ensuring right access for Admins, Doctors, and Staff.</p>
          </div>

          <div className="feature-card">
            <div className="icon-wrapper orange-glow">
              <PieChart size={28} />
            </div>
            <h3>Reports & Analytics</h3>
            <p>Visualize occupancy statistics and operational data to make informed decisions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Activity size={20} /> HRWMS
          </div>
          <p>© 2026 Hospital Resource & Ward Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;