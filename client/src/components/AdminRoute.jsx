import { Navigate } from "react-router-dom";

import React from 'react'

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) return <Navigate to="/login" replace />;
    if (role !== "admin") return <Navigate to="/courses" replace />;
    return children;
}

export default AdminRoute