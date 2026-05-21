import React from "react";
// import { useAuth } from '../context/AuthContext';
// import UserDashboard from "../pages/Dashboard/UserDashboard";
// import AdminDashboard from "../pages/Dashboard/AdminDashboard";
// import { useAuth } from "../context/AuthContext";
import UserDashboard from "../../pages/Dashboard/UserDashboard";
import AdminDashboard from "../../pages/Dashboard/AdminDashboard";
import { useAuth } from "../../context/AuthContext";
function ParentDashboard() {
  const { user } = useAuth();

  if (user?.role === 'user') {
    return <UserDashboard />;
  } else if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  return <div>Unauthorized</div>;
}

export default ParentDashboard;