import React from "react";
import {useLocation } from "react-router-dom";

function TopBar() {  
  const location = useLocation();

  // const activeUserId = location.pathname.startsWith("/users/")
  //   ? parseInt(location.pathname.split("/users/")[1], 10)
  //   : null;

  return (
    <div>
      <div className="topbar">
        <div style={{display:"flex",alignItems:"center"}}>
          <h1 style={{color:"white"}}>APT. LIFE ORGANIZER</h1>
        </div>
      </div>

    </div>
  );
}

export default TopBar;
