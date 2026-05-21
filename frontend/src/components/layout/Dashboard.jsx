import React from "react";
import { Outlet } from "react-router-dom";
// import SideBar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import SideBar from "../../pages/Dashboard/SideBar";
import "../../css/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
        <DashboardHeader />
        <div className="dashboard-content">
            <SideBar />
            <div className="dashboard-main">    
                <Outlet />
            </div>
        </div>
    </div>
    );
};
export default Dashboard;