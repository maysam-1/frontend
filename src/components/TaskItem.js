import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";


async function fetchTasks(inputvalue) {

    const res = await axios.get(`http://localhost:8000/tasks/${inputvalue}`);
    return res.data; 
  }

function Task(){
    const[inputvalue,setValue]=useState('')
  const { data: task = {}, error, isLoading } = useQuery({
    queryKey: ["task",inputvalue], 
    queryFn: () => fetchTasks(inputvalue),
    staleTime: 5000,
  });
   isLoading&&<h1>is loading...</h1>
   error&&console.log(error.message)
   return(
    <div>
        <input placeholder="enter task id" onChange={(e)=>{setValue(e.target.value)}}/>
    <ul style={{listStyleType:"none",display:"flex",flexWrap:"wrap",color:"black",alignItems:"center"}}>
   {
    
    !isLoading &&
     <li id="card" key={task.id} style={{margin:"20px"}}>
        <div>
        <h1 style={{maxWidth:"200px",display:"flex",position:"relative",left:"0"}}>{task.title}</h1>
        <h4 style={{maxWidth:"200px"}}>due date:{task.dueDate}</h4>
        </div>
    </li>
    
    
    }

   </ul></div>)
   
}
export default Task;