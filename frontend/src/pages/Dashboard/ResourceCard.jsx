import React from 'react';
import "../../css/resourceCard.css";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import footballImg from '../../assets/football-field.png';
import tractorImg from '../../assets/tractor.png';
import carImg from '../../assets/taxi (1).png';

function ResourceCard() {

  const resources = [
    {
      name: "Football Field",
      description: "A spacious football field for training and matches.",
      price: 500,
      capacity: "22 players",
      image: footballImg
    },
    {
      name: "Tractor",
      description: "Used for farming and agricultural activities.",
      price: 80,
      capacity: "1 driver",
      image: tractorImg
    },
    {
      name: "Community Car",
      description: "Transport vehicle for community use.",
      price: 40,
      capacity: "5 passengers",
      image: carImg
    }
  ];

  return (
    <div className="resourceCard-page">

      {/* HEADER */}
      <div className="resource-header">

        {/* 🔥 NAV STYLE BACK BUTTON */}
        <Link to="/dashboard" className="nav back-nav">
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <h1>Available Resources</h1>
        <p>Browse and book community-owned resources</p>
      </div>

    
      <div className="resource-grid">
        {resources.map((res, index) => (
          <div className="card" key={index}>

            <div className="card-image-wrapper">
              <img src={res.image} alt={res.name} />
            </div>

       
            <div className="card-content">
              <h2>{res.name}</h2>
              <p className="desc">{res.description}</p>

              <div className="meta">
  <div className="meta-row">
    <span className="label">Price per day</span>
    <span className="value">D{res.price}</span>
  </div>

  <div className="meta-row">
    <span className="label">Capacity</span>
    <span className="value">{res.capacity}</span>
  </div>
  </div>

              <button className="btn-book">Book Now</button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}

export default ResourceCard;