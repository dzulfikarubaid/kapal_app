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
<table className='text-sm text-center'>
  <thead>
  <tr>
    <th >Route</th>
    <th >Speed</th>
    <th>Distance</th>
    <th>RPM</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>RPM</th>
    <th>Fuel Oil Consumption</th>
    <th>MDO</th>
    <th>HSD</th>
    <th>LSFO</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>MDO</th>
    <th>HSD</th>
    <th>LSFO</th>
    <th>Running Hours</th>
    <th>Fuel Oil Consumption</th>
    <th>MDO</th>
    <th>HSD</th>
    <th>LSFO</th>
  </tr>
  </thead>
  </table>
  </div>
    </div>
  )
}

export default OfficerDashboard