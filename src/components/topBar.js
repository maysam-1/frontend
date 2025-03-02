import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function TopBar() {
  const [active, setActive] = useState("User1");
  const users = ["User1", "User2", "User3", "User4", "User5", "User6", "User7"];
 
  return (
    <div className="topbar">
      <div className="topbar-buttons">
        {users.map((user, index) => (
          <button
            key={user}
            className={`sidebar-item topbar-button ${active === user ? "active" : ""}`}
            style={{ marginLeft: index === 0 ? "20px" : "0" }}
            onClick={() => setActive(user)}
          >
            {user}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TopBar;
