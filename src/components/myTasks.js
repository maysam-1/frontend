import axios from "axios";
import { useQuery} from "@tanstack/react-query";

const user = JSON.parse(localStorage.getItem("user"));
const userId = user ? user.id : null; 
console.log("user id from my tasks",userId)

console.log(userId);
async function fetchTasks() {
    const res = await axios.get(`http://localhost:8000/tasks/mytasks/${userId}`);
    return res.data; 
  }

  async function deleteTask(id) {
    const res = await axios.put(`http://localhost:8000/tasks/delete/${id}`);
    window.location.reload();
    return res.data; 
  }


function MyTasks(){

  const { data: tasks = [], error, isLoading } = useQuery({
    queryKey: ["mytasks"], 
    queryFn: () => fetchTasks(),
    staleTime: 5000,

  });

   
   isLoading&&<h1>is loading...</h1>
   error&&console.log(error.message)
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
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>Move to Recycle Bin</button>
          <div style={{display:"flex", flexDirection:"row"}}>
                <h6 style={{ color: "#3d3f72", marginLeft: "1px",marginRight:"4px"}}>
          {task.isPublic==1 ? "Public" : "Private"}
        </h6> 
          <h6 style={{ color: "#3d3f72", marginLeft: "1px" }}>Priority: 
            {task.priority_id === 1 ? "High" : task.priority_id === 2 ? "Medium" : "Low"}
          </h6></div>
        {console.log(`title:${task.title} id:${task.id}`)}
        </div>
    </li>
    
    
    })}

   </ul>)
   
}
export default MyTasks;