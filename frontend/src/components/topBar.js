import React, { useEffect, useState } from "react";

function TopBar() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleUserChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("userChange", handleUserChange);
    return () => {
      window.removeEventListener("userChange", handleUserChange);
    };
  }, []);

  return (
    <div>
      <div className="topbar">
      <h5 style={{ marginRight: "250px", color: "white",marginLeft:"50px" }}>
            {user ? user.username : ""}
          </h5>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1 style={{ color: "white" }}>APT. LIFE ORGANIZER</h1>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
