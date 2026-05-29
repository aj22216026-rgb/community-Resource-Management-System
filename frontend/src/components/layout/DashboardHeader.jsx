import React from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.png";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import "../../css/dashboardheader.css";
// import "";

const DashboardHeader = () => {
    const { user, setUser } = useAuth();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <div className="dashboard-header">
           
                 {/* HEADER */}
                 <div className="sub-heading">
                   <h1 className="tit"></h1>
           
                   <div className="logout">
                     
           
                     <img src={user?.profile_pic || profileImg} alt="profile" className="profile-img" />
                     <div className="user-detail">
                     <p>{user?.username} </p>
                     <span>{user?.role}</span>
                     </div>
           
                     <Link onClick={logout}>
                       <span className="logout-btn">
                         <FiLogOut /> Logout
                       </span>
                     </Link>
                   </div>
                 </div>
        </div>
    );
};
export default DashboardHeader;