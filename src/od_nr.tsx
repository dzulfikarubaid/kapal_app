import React, { useState } from 'react'
import { DefaultInput, InputNoLabel, TopBar1 } from './template_element'

const OdNr = () => {
   const [inputs, setInputs] = useState({

    vessel_name: "",
    period1: "",
    period2:""
  });
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

       <div className='flex flex-col gap-2'>
       <h1>Period</h1>
       <div className='flex flex-row gap-3 items-center'>
        <InputNoLabel type="date" value={inputs.period1} onChange={(e: any) => handleInputChange("period1", e.target.value)} />
        <h1>to</h1>
         <InputNoLabel type="date" value={inputs.period2} onChange={(e: any) => handleInputChange("period2", e.target.value)} /></div>
       </div>
      
       </div>
    </div>
  )
}

export default OdNr