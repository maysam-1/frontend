import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    let user = null;

    try {
        const storedUser = localStorage.getItem("user");
        user = storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
        console.error("Error reading user from localStorage:", error);
        user = null; // Ensure it remains null in case of an error
    }

    if (!user) {
        // If no user is logged in, redirect to login page
        return <Navigate to="/signin" />;
    }

    return children; // Allow access to the protected route
};

export default PrivateRoute;
