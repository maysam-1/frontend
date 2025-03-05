import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem("user");

    if (!user) {
        // If no user is logged in, redirect to login page
        return <Navigate to="/signin" />;
    }

    return children; // Allow access to the children (protected route)
};

export default PrivateRoute;
