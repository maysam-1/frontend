import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route, Router} from "react-router-dom"
import AllTasks from './components/TaskList';
import Task from './components/TaskItem';
import TaskForm from './components/TaskForm';
import Sidebar from './components/sideBar';
import TopBar from './components/topBar';
import KK from './pages/KK';


function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <TopBar/>
     <Sidebar/>
     <Routes>
      <Route path='task' element={<Task/>}></Route>
      {/* <Route path='add' element={<TaskForm/>}></Route> */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/all-tasks" element={<AllTasks />} />
      <Route path="/add-task" element={<TaskForm />} />
      <Route path="/KK" element={<KK/>} />

     </Routes>
     </BrowserRouter>
    </div>
  );
}


export default App;
