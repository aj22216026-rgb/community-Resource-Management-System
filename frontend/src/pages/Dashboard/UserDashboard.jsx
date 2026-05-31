import React, { useEffect, useState } from 'react';
import profileImg from "../../assets/profile.png";
import { FiLogOut } from "react-icons/fi";
import { FaTractor, FaCarSide } from "react-icons/fa6";
import { GiSoccerField, GiTreeBranch } from "react-icons/gi";
import { SiPivotaltracker } from "react-icons/si";
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import SideBar from './SideBar';
import axios from 'axios';




function UserDashboard() {

  const [totalAvailable, setAvailable] = useState(0);
  const[filterResourcse,setFilterResource]=useState([]) 
  // const username = JSON.parse(localStorage.getItem("user"))?.username || "User";
  const{user,setUser}=useAuth()
   const [resourcess, setResourcess] = useState([])
   console.log("resourcess", resourcess)
   console.log("filterResourcse", filterResourcse)
  
    useEffect(() => {
      const fetchResources = async () => {
        try {
          const response = await axios.get('http://localhost:5000/resources/fetch');  
          setResourcess(response.data.result[0]);
          console.log("response form resource1", response.data.result[0])
        } catch (error) {
          console.error('Error fetching resources:', error);
        }
      };

      fetchResources();
    }, [])
   const filtersResources = (type) => {
    const result = resourcess.filter(
        r => r.type.toLowerCase()===type.toLowerCase()
    );
    setFilterResource(result)
    // console.log('result', result);

    return result;
}
// console.log("result", filtersResources("football field"))
useEffect(() => {
  if (resourcess.length > 0) {
    filtersResources("Tractor");
  }
}, [resourcess]);

  const resources = [
    { name: 'Football Field 1', status: 'Available' },
    { name: 'Tractor', status: 'Available' },
    { name: 'Farm 1', status: 'Maintenance' },
  ];
  
  // useEffect(() => {
  //   const availableResources = resources.filter(
  //     r => r.status === 'Available'
  //   );
  //   setAvailable(availableResources.length);
  // }, []);
const groupedResources = Object.values(
  resourcess.reduce((acc, resource) => {
    const type = resource.type.trim();

    if (!acc[type]) {
      acc[type] = {
        type,
        total: 0,
        available: 0
      };
    }

    acc[type].total++;

    if (resource.status.toLowerCase() === "available") {
      acc[type].available++;
    }

    return acc;
  }, {})
);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null)
    window.location.href = "/";
  };

  return (
    <div className="dashboard-page">

        <h2 className="resource-title">Browse Resources</h2>
        <p className="resource-dash">Tap any resource icon to explore details and access what’s available</p>

        <SideBar />
<div className="main-card">

  {groupedResources.map((card, index) => {
    const percentage = (card.available / card.total) * 100;

    return (
      <div className="card" key={index}>
        <Link to={`/dashboard/resource-detail/${card.type}`}>
          <div className="card-icon">
            {card.type.toLowerCase() === "football field" ? (
              <GiSoccerField color="green" />
            ) : card.type.toLowerCase() === "tractor" ? (
              <FaTractor color="red" />
            ) : card.type.toLowerCase() === "farm" ? (
              <GiTreeBranch color="green" />
            ) : card.type.toLowerCase() === "car" ? (
              <FaCarSide color="blue" />
            ) : (
              <SiPivotaltracker color="orange" />
            )}
          </div>
        </Link>

        <h3>{card.type}</h3>

        <p className="stats">
          {card.available} of {card.total} available
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  })}

  {/* MOCK MAIN HALL CARD */}

  <div className="card mock-card">

    <div className="card-icon">
      🏢
    </div>

    <h3>Main Hall</h3>

    <p className="stats">
      Coming Soon
    </p>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: "100%" }}
      />
    </div>
  </div>
</div>

      
        <div className="summary-container">

          <div className="cards">
            <p className="title">Total Resources</p>
            <h2 className="numbert">{resourcess.length}</h2>
          </div>

          <div className="cards">
            <p className="title">Available Now</p>
            <h2 className="numbera">{resourcess.filter(r => r.status.toLowerCase() === "available").length}</h2>
          </div>

          <div className="cards">
            <p className="title">Under Maintenance</p>
            <h2 className="numberm">{resourcess.filter(r => r.status.toLowerCase() === "maintenance").length}</h2>
          </div>

        </div>

      </div>
  );
}

export default UserDashboard;