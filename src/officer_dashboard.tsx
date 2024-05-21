import React, { useEffect, useState } from 'react'
import { DefaultInput, TopBar1 } from './template_element'
import axios from 'axios';

const OfficerDashboard = () => {
   const [inputs, setInputs] = useState({

    vessel_name: "",
    voyage_code: "",
  });
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get("http://sezero.pythonanywhere.com/officer-dashboard", {headers:{

    }})
    .then((response:any)=>{
      console.log(response.data)
      setData(response.data)
    })
    .catch((error:any)=>{
      console.log(error)
    })
  },[])
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  return (
    <div><TopBar1></TopBar1>
    <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />
      
       </div>
       <div className='relative overflow-x-auto mt-5'>
<table className='styled-table text-sm text-center '>
  <thead>
  <tr>
    <th >Route</th>
    <th >Speed (kn)</th>
    <th>Distance (Nm)</th>
    <th>Actual Distance (Nm)</th>
    <th>Trim (m)</th>
    <th>Displacement (Ton)</th>
     <th>Reefer Container</th>
    <th>Time Departure</th>
    <th>Time Arrival</th>
    <th>Sea Hour</th>
    <th>Port Hour</th>
    <th>Manuvering Hour</th>
    <th>Wind Direct</th>
    <th>Wind Force</th>
    <th>Cloudness</th>
    <th>Weather Condition</th>
    <th>Sea Condition</th>
    <th>Relative Current</th>
  </tr>
  </thead>
  <tbody>
  {data && Object.values(data).flat().map((item:any, index) => (
   inputs.vessel_name === item.vessel_name && inputs.voyage_code === item.voyage_code &&
    <tr key={index}>
        <td>{item.route}</td>
        <td>{item.speed}</td>
        <td>{item.distance}</td>
        <td>{item.actual_distance}</td>
        <td>{item.trim}</td>
        <td>{item.displacement}</td>
        <td>{item.rc}</td>
        <td>{item.td}</td>
        <td>{item.time2}</td>
        <td>{item.time2 - item.time1}</td>
        <td>{item.ph}</td>
        <td>{item.mh}</td>
        <td>{item.direct}</td>
        <td>{item.force}</td>
        <td>{item.cloud}</td>
        <td>{item.wc}</td>
        <td>{item.sc}</td>
        <td>{item.rcd}</td>
    </tr>
))}
  </tbody>
  </table>
  </div>
    </div>
  )
}

export default OfficerDashboard