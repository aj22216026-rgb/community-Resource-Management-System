import React, { useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { FiLogOut, FiHome, FiFolder, FiCalendar, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { jsx } from "react/jsx-runtime";
import "../../css/sideBar.css";

function SideBar() {    
    const { user, setUser } = useAuth();
    const[menuItems,setMenuItems]=useState([]);

    const adminLinks = [
        { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { name: "Resources", path: "/dashboard/resources", icon: <FiFolder /> },
        { name: "Bookings", path: "/dashboard/manage-bookings", icon: <FiCalendar /> },
        { name: "Users", path: "/dashboard/users", icon: <FiUser /> },
        
        { name: "Analytics", path: "/dashboard/analytics", icon: <FiUser /> },
    ];
    const userLink=[
        { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        // { name: "Resources", path: "/dashboard/resources", icon: <FiFolder /> },
        { name: "My Accounts", path: "/dashboard/user-accounts", icon: <FiUser /> },
        { name: "Payments", path: "/dashboard/user-payments", icon: <FiCalendar /> },
    ];

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        window.location.href = "/login";
    };
useEffect(()=>{
    if(user?.role==="admin"){
        setMenuItems(adminLinks);   
    }else{
        setMenuItems(userLink);
    }
},[user])
    return (
        <div className="sidebar">

            {/* HEADER */}
            <div className="sidebar-header">
                CRMS
            </div>

            {/* NAVIGATION */}
            <nav className="nav-linksp">
                {menuItems.map((link) => (
                    <NavLink key={link.path} to={link.path} className={({isActive})=>isActive?"isActive items-nav":"items-nav"}>
                        {link.icon}
                        <span>{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            {/* PROFILE */}
            <div className="profile-section">
                <p>
                    {user?.username} <br />
                    <span>{user?.role}</span>
                </p>

                <div onClick={logout} className="logout-btn">
                    <FiLogOut /> Logout
                </div>
            </div>

        </div>
    );
}

export default SideBar;