import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchTasks(userId) {
  const res = await axios.get(`http://localhost:8000/tasks/usertasks/${userId}`);
  return res.data;
}

const UserDetails = () => {
  const { userId } = useParams();

  const { data: tasks = [], error, isLoading } = useQuery({
    queryKey: ["alltasks", userId], // Add userId to the key so it refetches on change
    queryFn: () => fetchTasks(userId),
    staleTime: 5000,
  });

  if (error) console.log(error.message);

  return (
    <ul className="item-list">
      {!isLoading &&
        tasks.map((task) => (
          <li id="card" key={task.id} style={{ margin: "20px" }} className="item">
            <div className="item-header">
              <img src={task.image} className="task-img" alt="img" />
            </div>

            <div style={{ position: "relative", display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  maxWidth: "300px",
                  display: "flex",
                  position: "relative",
                  left: "3px",
                  top: "23px",
                  fontSize: "30px",
                  fontWeight: "bold",
                }}
              >
                {task.title}
              </div>
              <h4 style={{ marginLeft: "1px", marginBottom: "1px" }}>due date: {task.dueDate}</h4>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h6 style={{ color: "#3d3f72", marginLeft: "1px", marginRight: "4px" }}>
                  {task.isPublic === 1 ? "Public" : "Private"}
                </h6>
                <h6 style={{ color: "#3d3f72", marginLeft: "1px" }}>
                  Priority: {task.priority_id === 1 ? "High" : task.priority_id === 2 ? "Medium" : "Low"}
                </h6>
                <h6 style={{ color: "#D5006D", marginLeft: "1px" }}>By: {task.username}</h6>
              </div>

              {console.log(`title:${task.title} id:${task.id}`)}
              {            console.log(task.username)
              }
            </div>
          </li>
        ))}
    </ul>
  );
};

export default UserDetails;
