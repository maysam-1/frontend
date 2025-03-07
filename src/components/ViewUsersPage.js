import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
    const [active,setActive]=useState(null)
  useEffect(() => {
    // Fetch all users when the component mounts
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/users/allusers");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  
 
  return (
    <div style={{ marginTop: "120px" }}>
      <h2>View Users</h2>
      <div style={{display:"flex",alignItems:"center",marginLeft:"200px"}}>
        {users.map((user) => (
          <button
            key={user.id}
            className={`sidebar-item ${active === user.id ? "active" : ""}`}
            onClick={() => {
                navigate(`/users/${user.id}`)
                setActive(user.id)
            }}
            
          >
            {user.username}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ViewUsersPage;
