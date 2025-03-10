import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const HandleSignOut = () => {
  const queryClient = useQueryClient();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null; 

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
      <Link onClick={handleSignOut} to="/signin" className={userId?"sign-out-link" : "sign-out-none" }>Sign out</Link>
      <Link  to="/signin" className={userId?"sign-in-none" : "sign-in-link" }>Sign in</Link>
    </h5>
  );
};

export default HandleSignOut;
