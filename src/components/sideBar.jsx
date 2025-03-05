import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import homeGif from "../icons/home.gif";
import pileGif from "../icons/taskspile.gif";
import mineGif from "../icons/mine.gif";
import addGif from "../icons/add2.gif";
import castleGif from "../icons/castle.gif"
import HandleSignOut from "./signOut";
function Sidebar() {
  const [active, setActive] = useState("Home");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate(); // Get the navigate function

  const menuItems = [
    { name: "Home", icon: <img src={homeGif} alt="Icon" style={{ height: "2rem", width: "2rem" }} />, path: "/" }, 
    { name: "All Tasks", icon: <img src={pileGif} alt="Icon" style={{ height: "2rem", width: "2rem" }} />, path: "/all-tasks" }, 
    { name: "My Tasks", icon: <img src={mineGif} alt="Icon" style={{ height: "2rem", width: "2rem" }} />, path: "/mytasks" }, 
    { name: "Add Task", icon: <img src={addGif} alt="Icon" style={{ height: "2rem", width: "2rem" }} />, path: "/add-task" }, 
    { name: "THE OGs", icon: <img src={castleGif} alt="Icon" style={{ height: "2rem", width: "2rem" }} />, path: "/KK" }, 

  ];

  const handleNavigation = (path, name) => {
    navigate(path);
    setActive(name); // Optional: Update active state
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2 className="sidebar-title">ALOR</h2>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`sidebar-item ${active === item.name ? "active" : ""}`}
            onClick={() => handleNavigation(item.path, item.name)} // Use handleNavigation
          >
            {item.icon}
            {!collapsed && <span className="sidebar-text">{item.name}</span>}
          </button>
        ))}
        <HandleSignOut></HandleSignOut>
        <label style={{position:"fixed",bottom:"5px",left:"5px"}}>Made By MAYSAM
        </label>
      </nav>
    </div>
  );
}

export default Sidebar;