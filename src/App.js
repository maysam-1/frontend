import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllTasks from './components/TaskList';
import TaskForm from './components/TaskForm';
import Sidebar from './components/sideBar';
import TopBar from './components/topBar';
import KK from './pages/KK';
import Signup from './components/signUp';
import SignIn from './components/signin';
import PrivateRoute from './components/privateRoute';
import Home from './components/home';
import MyTasks from './components/myTasks';
import React from "react";
import ViewUsersPage from './components/ViewUsersPage';
import UserDetails from './pages/userDetails';
import EditTaskForm from './components/editTask';

function App() {
 

  return (
    <div className="App">
      <BrowserRouter>
        <TopBar/>
        <Sidebar />
        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path='/home' element={<Home />} />

          {/* Protected Routes (Require Authentication) */}
          <Route 
          path="/users/:userId"
           element={<PrivateRoute>
            <UserDetails />
            </PrivateRoute>} /> 

            <Route 
          path="/tasks/edit/:taskId"
           element={<PrivateRoute>
            <EditTaskForm />
            </PrivateRoute>} /> 

          <Route
            path="/mytasks"
            element={
              <PrivateRoute>
                <MyTasks />
              </PrivateRoute>
            }
          />
         
          <Route
            path="/all-tasks"
            element={
              <PrivateRoute>
                <AllTasks />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-task"
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/view-users"
            element={
              <PrivateRoute>
                <ViewUsersPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/KK"
            element={
              <PrivateRoute>
                <KK />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
