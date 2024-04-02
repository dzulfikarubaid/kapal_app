import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './home.tsx';
import Signin from './signin.tsx';
import Signup from './signup.tsx';
import Engineer from './engineer.tsx';
import CE from './ce.tsx';
import BunkeringEngineer from './bunkering_engineer.tsx';
import InputEngineer from './input_engineer.tsx';
import LogbookEngineer from './logbook_engineer.tsx';
import DashboardEngineer from './dashboard_engineer.tsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  },
  {
    path: "/engineer",
    element: <Engineer></Engineer>,
  },
  {
    path: "/bunkering-engineer",
    element: <BunkeringEngineer></BunkeringEngineer>,
  },
  {
    path: "/input-engineer",
    element: <InputEngineer></InputEngineer>,
  },
  {
    path: "/logbook-engineer",
    element: <LogbookEngineer></LogbookEngineer>,
  },

  {
    path: "/dashboard-engineer", // Add the new path for the dashboard engineer
    element: <DashboardEngineer></DashboardEngineer>,
  },
  {
    path: "/ce",
    element: <CE></CE>,
  },
]);



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <div className='p-6'>
  <RouterProvider router={router} />
  </div>
    
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
