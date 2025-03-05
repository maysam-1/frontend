
import { Link } from "react-router-dom";

const handleSignOut = () => {
    localStorage.removeItem("user");

    <Link to="/signin">Sign out</Link>
};

export default handleSignOut;