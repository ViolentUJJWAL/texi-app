import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();
    console.log(useSelector((state) => state.auth));

    if (!isAuth) {
        // Redirect to login while saving the attempted URL
        return <Navigate to="/user/auth" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;