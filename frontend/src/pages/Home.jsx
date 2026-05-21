import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css";

// IMPORT YOUR COMPONENTS
import Login from "../pages/Login";
import Register from "../pages/Register";

function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">CRMS</h2>

        <ul className="nav-linksa">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="auth-buttons">
          <button className="btn-outline" onClick={() => setShowLogin(true)}>
            Login
          </button>

          <button className="btn-filled" onClick={() => setShowRegister(true)}>
            Register
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <h1>Community Resource Management</h1>

          <p>
            Easily manage and book shared community resources in one place.
            Access facilities, equipment, and services anytime.
          </p>

          <div className="hero-buttons">
            <button className="btn-filled" onClick={() => setShowRegister(true)}>
              Get Started
            </button>

            <button className="btn-outline" onClick={() => setShowLogin(true)}>
              Login
            </button>
          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
            alt="community system"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <h3>⚽ Sports Facilities</h3>
          <p>Book football fields instantly</p>
        </div>

        <div className="feature">
          <h3>🚜 Equipment</h3>
          <p>Access tractors and tools</p>
        </div>

        <div className="feature">
          <h3>🌾 Farms</h3>
          <p>Manage land and agriculture</p>
        </div>

        <div className="feature">
          <h3>🚗 Vehicles</h3>
          <p>Reserve community vehicles</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 CRMS | Community Site
      </footer>

      {/* ================= MODALS ================= */}

      {/* LOGIN MODAL */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={() => setShowLogin(false)}>
              ✕
            </button>

            <Login
              onSuccess={() => setShowLogin(false)}
            />

          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <div className="modal-overlay" onClick={() => setShowRegister(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={() => setShowRegister(false)}>
              ✕
            </button>

            <Register
              onSuccess={() => setShowRegister(false)}
            />

          </div>
        </div>
      )}

    </div>
  );
}

export default Home;