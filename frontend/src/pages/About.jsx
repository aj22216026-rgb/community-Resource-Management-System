import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/about.css";

import Login from "../pages/Login";
import Register from "../pages/Register";

function About() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">CRMS</h2>

        <ul className="nav-linksa">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="auth-buttons">
          <button
            className="btn-outline"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <button
            className="btn-filled"
            onClick={() => setShowRegister(true)}
          >
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="about-hero">
        <h1>About CRMS</h1>

        <p>
          Community Resource Management System (CRMS) is a web-based
          platform designed to help communities efficiently manage,
          share, and reserve valuable resources.
        </p>
      </section>

      {/* ABOUT CONTENT */}
      <section className="about-content">

        <div className="about-card">
          <h2>Our Mission</h2>

          <p>
            CRMS aims to improve community development by providing a
            centralized system where users can easily access, book,
            and manage shared resources such as football fields,
            tractors, farms, vehicles, and community facilities.
          </p>
        </div>

        <div className="about-card">
          <h2>What CRMS Offers</h2>

          <ul>
            <li>✔ Resource Booking System</li>
            <li>✔ Online Payment Processing</li>
            <li>✔ Resource Availability Tracking</li>
            <li>✔ User Account Management</li>
            <li>✔ Admin Resource Management</li>
            <li>✔ Invoice Generation</li>
            <li>✔ Community Resource Sharing</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Why CRMS?</h2>

          <p>
            Traditional resource management often leads to double
            bookings, poor record keeping, and inefficient utilization
            of community assets. CRMS solves these challenges by
            providing a transparent and user-friendly digital solution.
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="about-stats">

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Online Access</p>
        </div>

        <div className="stat-card">
          <h2>100%</h2>
          <p>Digital Management</p>
        </div>

        <div className="stat-card">
          <h2>Easy</h2>
          <p>Resource Booking</p>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 CRMS | Community Resource Management System
      </footer>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>

            <Login
              openRegister={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <div
          className="modal-overlay"
          onClick={() => setShowRegister(false)}
        >
          <div
            className="modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowRegister(false)}
            >
              ✕
            </button>

            <Register
              openLogin={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default About;