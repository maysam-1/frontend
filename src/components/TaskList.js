import axios from "axios";
import { useQuery } from "@tanstack/react-query";

async function fetchTasks() {
    const res = await axios.get("http://localhost:8000/tasks/alltasks");
    return res.data; 
  }

  async function deleteTask(id) {
    const res = await axios.put(`http://localhost:8000/delete/${id}`);
    return res.data; 
  }


function AllTasks(){

  const { data: tasks = [], error, isLoading } = useQuery({
    queryKey: ["tasks"], 
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
        <h4 style={{marginLeft:"5px",marginBottom:"1px"}}>due date: {task.dueDate}</h4>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>Move to Recycle Bin</button>
        <button className="delete-btn">Delete Forever</button>

                <h6 style={{ color: "#3d3f72", marginLeft: "1px"}}>
          {task.isPublic==1 ? "Public" : "Private"}
        </h6>
        {console.log(`title:${task.title} id:${task.id}`)}
        </div>
    </li>
    
    
    })}

   </ul>)
   
}
export default AllTasks;