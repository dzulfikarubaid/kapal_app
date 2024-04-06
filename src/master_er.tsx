import React, { useState } from 'react'
import { DefaultInput, TopBar1 } from './template_element'

const MasterEr = () => {
   const [inputs, setInputs] = useState({

    vessel_name: "",
    voyage_code: "",
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

        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />
      
       </div>
    </div>
  )
}

export default MasterEr