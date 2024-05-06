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
import BunkeringEngineer from './engineer_bunkering.tsx';
import InputEngineer from './engineer_input.tsx';
import LogbookEngineer from './engineer_logbook.tsx';
import DashboardEngineer from './engineer_dashboard.tsx';
import Officer from './officer.tsx';
import OfficerLogbook from './officer_logbook.tsx';
import OfficerDashboard from './officer_dashboard.tsx';
import OfficerNr from './officer_nr.tsx';
import OfficerDr from './officer_dr.tsx';
import MasterDr from './master_dr.tsx';
import MasterNr from './master_nr.tsx';
import MasterEr from './master_er.tsx';
import Master from './master.tsx';
import Od from './od.tsx';
import OdNr from './od_nr.tsx';
import OdOh from './od_oh.tsx';
import OdPd from './od_pd.tsx';
import CeDr from './ce_dr.tsx';
import CeNr from './ce_nr.tsx';
import Confirmation from './confirmation.tsx';
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
  {
    path: "/officer",
    element: <Officer></Officer>
  },
  {
    path: "/officer-logbook",
    element: <OfficerLogbook></OfficerLogbook>
  },
  {
    path: "/officer-dashboard",
    element: <OfficerDashboard></OfficerDashboard>
  },
  {
    path: "/officer-nr",
    element: <OfficerNr></OfficerNr>
  },
  {
    path: "/officer-dr",
    element: <OfficerDr></OfficerDr>
  },
  {
    path:"/master",
    element: <Master></Master>
  },
  {
    path: "/master-er",
    element: <MasterEr></MasterEr>
  },
  {
    path:"/master-nr",
    element: <MasterNr></MasterNr>
  },
  {
    path:"/master-dr",
    element: <MasterDr></MasterDr>
  },
  {
    path:"/od",
    element: <Od></Od>
  },
  {
    path:"/od-nr",
    element: <OdNr></OdNr>
  },
  {
    path:"/od-oh",
    element: <OdOh></OdOh>
  },
  {
    path:"/od-pd",
    element: <OdPd></OdPd>
  },
  {
    path:"/ce-dr",
    element: <CeDr></CeDr>
  },
  {
    path:"/ce-nr",
    element: <CeNr></CeNr>
  },
  {
    path:"/confirmation",
    element: <Confirmation></Confirmation>
  }


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
