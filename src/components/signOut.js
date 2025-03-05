import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const HandleSignOut = () => {
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    try {
      localStorage.removeItem("user");
      
      queryClient.invalidateQueries(["mytasks"]);
      window.location.reload();

    } catch (err) {
      console.log("Sign out error:", err);
    }
  };
  return (
    <h5>
      <Link onClick={handleSignOut} to="/signin">Sign out</Link>
    </h5>
  );
};

export default HandleSignOut;
