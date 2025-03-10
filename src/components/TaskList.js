import axios from "axios";
import { useQuery } from "@tanstack/react-query";

async function fetchTasks() {
  try {
    const res = await axios.get("http://localhost:8000/tasks/alltasks");
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks. Please try again later."); 
  }
}



function AllTasks(){

  const { data: tasks = [], error, isLoading } = useQuery({
    queryKey: ["alltasks"], 
    queryFn: () => fetchTasks(),
    staleTime: 5000,
  });
 

   
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
   return(
    <ul className="item-list">
   {
    !isLoading && 
    tasks.map((task)=>{
    return <li id="card" key={task.id} style={{margin:"20px"}} className="item">
        <div className="item-header">
        <img src={task.image} className="task-img" alt="img"/>
        </div>
        

        <div style={{position:"relative",display:"flex",flexDirection:"column"}}>
        <div style={{maxWidth:"300px",
          display:"flex",
          position:"relative",
          left:"3px",
          top:"23px",
          fontSize:"30px",
          fontWeight:"bold"}}>{task.title}</div>
        <h4 style={{marginLeft:"1px",marginBottom:"1px"}}>due date: {task.dueDate}</h4>
          <div style={{display:"flex", flexDirection:"row"}}>
                <h6 style={{ color: "#3d3f72", marginLeft: "1px",marginRight:"4px"}}>
          {task.isPublic===1 ? "Public" : "Private"}
        </h6> 
          <h6 style={{ color: "#3d3f72", marginLeft: "1px" }}>Priority:-
            {task.priority_id === 1 ? "High" : task.priority_id === 2 ? "Medium" : "Low"}
          </h6>
          <h6 style={{ color:"#D5006D", marginLeft: "1px" }}>By:-
            {task.username}
          </h6></div>
          
        {console.log(`title:${task.title} id:${task.id}`)}
        </div>
    </li>
    
    
    })}

   </ul>)
   
}
export default AllTasks;