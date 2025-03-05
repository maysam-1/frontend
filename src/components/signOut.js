
import { Link } from "react-router-dom";

const handleSignOut = () => {
    localStorage.removeItem("user");

    <Link to="/signup">Sign up</Link>
};

export default handleSignOut;