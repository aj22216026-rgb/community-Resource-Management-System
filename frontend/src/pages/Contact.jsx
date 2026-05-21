import React, { useState } from 'react'
import "../css/contact.css"

import { Link } from 'react-router-dom'


function Contact() {

  // CHATBOT STATE
  const [messages, setMessages] = useState([
    { text: "Hello 👋 I'm your CRMS assistant. Ask me anything about the system.", sender: "bot" }
  ])

  const [input, setInput] = useState("")

  // CHATBOT LOGIC
  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { text: input, sender: "user" }

    let botReply = ""

    const text = input.toLowerCase()

    if (text.includes("what is crms")) {
      botReply = "CRMS is a Community Resource Management System that helps manage farms, tractors, vehicles, and shared community resources."
    } 
    else if (text.includes("features")) {
      botReply = "CRMS allows you to book football fields ⚽, access tractors 🚜, manage farms 🌾, and reserve vehicles 🚗 easily."
    } 
    else if (text.includes("contact") || text.includes("email")) {
      botReply = "You can reach us at 📧 crms@gmail.com or call 📞 +220 7532214."
    } 
    else if (text.includes("booking")) {
      botReply = "Booking is simple! Just login, choose a resource, check availability, and reserve it."
    } 
    else {
      botReply = "I can help you understand CRMS. Try asking about features, booking, or contact 😊"
    }

    const botMessage = { text: botReply, sender: "bot" }

    setMessages([...messages, userMessage, botMessage])
    setInput("")
  }

  return (
    <div className="home">

      {/* NAVBAR */}
      <nav className="navbar">
        <h2 className="logo">CRMS</h2>

        <ul className="nav-linksa">
                 <li><a href="/">Home</a></li>
                 <li><a href="/about">About</a></li>
                 <li><Link to="/contact">Contact</Link></li>
               </ul>

        <div className="auth-buttons">
          <Link to="/login" className="btn-outline">Login</Link>
          <Link to="/register" className="btn-filled">Register</Link>
        </div>
      </nav>

      {/* CONTACT SECTION */}
      <section className="contact">

        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>We’d love to hear from you. Reach out anytime.</p>
        </div>

        <div className="contact-wrapper">

          {/* LEFT INFO */}
          <div className="contact-card">
            <h3>Get in Touch</h3>
            <p>📍 Brikama, The Gambia</p>
            <p>📞 +220 3832450</p>
            <p>📧 assansjeng@gmail.com</p>
          </div>

         

        </div>

      </section>

    </div>
  )
}

export default Contact