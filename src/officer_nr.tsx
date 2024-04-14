import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios'

const OfficerNr = () => {
  const handleSubmit = () => { 
    console.log(inputs)
    axios.post("http://sezero.pythonanywhere.com/officer-nr/", inputs)
    .then((response:any)=>{
      console.log(response)
      alert("Success added noon report data")
    })
    .catch((error:any)=>{
      console.log(error)
      const errors = error.response.data;

      let error_message = "";
      Object.keys(errors).forEach(key => {
        error_message += `${key}: ${errors[key]}\n`
      });
      alert(error_message)
    })
  }
    const [inputs, setInputs] = useState({

    distance: "",
    speed: "",
    vessel_name: "",
    user: JSON.parse(localStorage.getItem('userData')!).id,
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
        <h1>Distance</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.distance} onChange={(e: any) => handleInputChange("distance", e.target.value)} />
          <h1>Nautical Mile</h1>
        </div>
        <h1>Speed</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.speed} onChange={(e: any) => handleInputChange("speed", e.target.value)} />
          <h1>Knot</h1>
        </div>
      </div>
      <div className='mt-10'>
      <DefaultButton onclick={handleSubmit} text="Submit"></DefaultButton></div>
    </div>
  )
}

export default OfficerNr