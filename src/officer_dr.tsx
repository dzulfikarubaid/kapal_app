import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'

const OfficerDr = () => {
    const [inputs, setInputs] = useState({

    td: "",
    displacement: "",
    trim:"",
    rc:"",
    vessel_name: "",
    route:"",
    date: "",
    voyage_code: "",
  });
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  return (
    <div>
    <TopBar1></TopBar1>
    <div className='flex flex-wrap w-full justify-between'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />
        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />
        <DefaultInput label="Date" type="date" value={inputs.date} onChange={(e: any) => handleInputChange("date", e.target.value)}></DefaultInput>

      </div>
      <div className=' flex flex-col gap-4 mt-10'>
        <h1>Time Departure</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.td} onChange={(e: any) => handleInputChange("td", e.target.value)} />
          <h1>WIB</h1>
        </div>
        <h1>Displacement</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.displacement} onChange={(e: any) => handleInputChange("displacement", e.target.value)} />
          <h1>Ton</h1>
        </div>
        <h1>Trim</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.trim} onChange={(e: any) => handleInputChange("trim", e.target.value)} />
          <h1>Meter</h1>
        </div>
        <h1>Reefer Container</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.rc} onChange={(e: any) => handleInputChange("rc", e.target.value)} />
   
        </div>
      </div>
      <div className='mt-10'>
      <DefaultButton onClick={()=>{}} text="Submit"></DefaultButton></div>
    </div>
  )
}

export default OfficerDr