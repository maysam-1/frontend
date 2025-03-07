import axios from "axios";
import { useQuery } from "@tanstack/react-query";


async function fetchTasks() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null; 

    if (!userId) {
      console.error("User ID is null. Cannot fetch tasks.");
      return []; // Return an empty array to avoid crashing the UI
    }
    try {
        const res = await axios.get(`http://localhost:8000/tasks/mytasks/${userId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching tasks:", error.message);
        throw error; // Ensures React Query knows an error occurred
    }
}

async function deleteTask(id) {
    try {
        const res = await axios.put(`http://localhost:8000/tasks/delete/${id}`);
        window.location.reload();
        return res.data;
    } catch (error) {
        console.error("Error deleting task:", error.message);
        alert("Failed to delete task. Please try again.");
    }
}

function MyTasks() {
    const { data: tasks = [], error, isLoading } = useQuery({
        queryKey: ["mytasks"],
        queryFn: fetchTasks,
        staleTime: 5000,
    });

    if (isLoading) return <h1>Loading...</h1>;

    if (error) return <h1 style={{ color: "red" }}>Error: {error.message}</h1>;

    return (
        <ul className="item-list">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <li id="card" key={task.id} style={{ margin: "20px" }} className="item">
                        <div className="item-header">
                            <img src={task.image} className="task-img" alt="Task" />
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
                            <h4 style={{ marginLeft: "1px", marginBottom: "1px" }}>Due date: {task.dueDate}</h4>
                            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Move to Recycle Bin</button>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <h6 style={{ color: "#3d3f72", marginLeft: "1px", marginRight: "4px" }}>
                                    {task.isPublic == 1 ? "Public" : "Private"}
                                </h6>
                                <h6 style={{ color: "#3d3f72", marginLeft: "1px" }}>
                                    Priority: {task.priority_id === 1 ? "High" : task.priority_id === 2 ? "Medium" : "Low"}
                                </h6>
                            </div>
                        </div>
                    </li>
                ))
            ) : (
                <h2>No tasks available</h2>
            )}
        </ul>
    );
}

export default MyTasks;
