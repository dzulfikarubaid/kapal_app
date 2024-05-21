import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios';

const OfficerLogbook = () => {
    const [inputs, setInputs] = useState({
    lat1: "",
    long1: "",
    lat2: "",
    long2: "",
    lat3: "",
    long3: "",
    lat4: "",
    long4: "",
    rcd:"",
    vessel_name: "",
    route:"",
    date_logbook: "",
    voyage_code: "",
    time1:"",
    time2:"",
    direct:"",
    force:"",
    cloud:"",
    wc:"",
    sc:"",
    user: JSON.parse(localStorage.getItem('userData')!).id,
  });
  const handleSubmit = () => {
    console.log(inputs)
    axios.post("http://sezero.pythonanywhere.com/officer-logbook/", inputs)
    .then((response:any)=>{
      console.log(response)
      alert("Success added data")
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
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  return (
    <div>
    <TopBar1></TopBar1>
     <div className='flex flex-wrap gap-4 w-full gap-x-20'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e:any) => handleInputChange("vessel_name", e.target.value)} />
        <DefaultInput label="Voyage Code"  type="text" value={inputs.voyage_code} onChange={(e:any) => handleInputChange("voyage_code", e.target.value)} />
        <DefaultInput label="Route"  type="text" value={inputs.route} onChange={(e:any) => handleInputChange("route", e.target.value)} />
        <DefaultInput type="date" label="Date" value={inputs.date_logbook} onChange={(e:any)=>handleInputChange("date_logbook", e.target.value)}></DefaultInput>
        <div className='flex flex-col'>
        <h1>Time Periode</h1>
        <div className='flex flex-row gap-4 justify-center items-center'>
        <InputNoLabel value={inputs.time1} onChange={(e:any)=>handleInputChange("time1", e.target.value)}></InputNoLabel>
        <h1>WIB</h1>
        <h1>-</h1>
        <InputNoLabel value={inputs.time2} onChange={(e:any)=>handleInputChange("time2", e.target.value)}></InputNoLabel>
        WIB
        </div>
        </div>


      </div>
      <div className='flex flex-row gap-24 mt-10'>
      <div className=' flex flex-col gap-3 '>
        <h1>Latitude 1</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.lat1} onChange={(e: any) => handleInputChange("lat1", e.target.value)} />
        </div>
        <h1>Longitude 1</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.long1} onChange={(e: any) => handleInputChange("long1", e.target.value)} />
        </div>
        <h1>Latitude 2</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.lat2} onChange={(e: any) => handleInputChange("lat2", e.target.value)} />
        </div>
        <h1>Longitude 2</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.long2} onChange={(e: any) => handleInputChange("long2", e.target.value)} />
        </div>
        <h1>Latitude 3</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.lat3} onChange={(e: any) => handleInputChange("lat3", e.target.value)} />
        </div>
        <h1>Longitude 3</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.long3} onChange={(e: any) => handleInputChange("long3", e.target.value)} />
        </div>
        <h1>Latitude 4</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.lat4} onChange={(e: any) => handleInputChange("lat4", e.target.value)} />
        </div>
        <h1>Longitude 4</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.long4} onChange={(e: any) => handleInputChange("long4", e.target.value)} />
        </div>
      </div>
      <div className='flex flex-col gap-3'>
       <h1>Wind Direct & Force</h1>
        <div className='flex flex-row gap-3'>
          <select id={`direct`} name={`direct`} value={inputs.direct} onChange={(e:any)=>handleInputChange('direct', e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 w-full">
          <option selected disabled value={""}>Select</option>
          <option value="N">N</option>
          <option value="NE">NE</option>
          <option value="E">E</option>
          <option value="SE">SE</option>
          <option value="S">S</option>
          <option value="SW">SW</option>
          <option value="W">W</option>
          <option value="WN">WN</option>
        </select>
        <select id={`force`} name={`force`} value={inputs.force} onChange={(e:any)=>handleInputChange('force', e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 w-full">
          <option selected disabled value={""}>Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6"> 6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        </div>
        <h1>Cloudness</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.cloud} onChange={(e: any) => handleInputChange("cloud", e.target.value)} />
   
        </div>
        <h1>Weather Condition</h1>
        <div className='flex flex-row gap-3'>
          <InputNoLabel type="text" value={inputs.wc} onChange={(e: any) => handleInputChange("wc", e.target.value)} />
   
        </div>
        <h1>Sea Condition</h1>
        <div className='flex flex-row gap-3'>
          <select value={inputs.sc} onChange={(e:any)=>handleInputChange('sc', e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 w-full">
          <option selected disabled value={""}>Select</option>
          <option value="Calm">Calm</option>
          <option value="Slight">Slight</option>
          <option value="Moderate">Moderate</option>
          <option value="Rough">Rough</option>
          <option value="Very Rough">Very Rough</option>
          <option value="Extremely Rough">Extremely Rough</option>
        </select>
   
        </div>
        <h1>Relative Current Direction</h1>
        <div className='flex flex-row gap-3'>
          <select id={`rcd`} name={`rcd`} value={inputs.rcd} onChange={(e:any)=>handleInputChange('rcd', e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 w-full">
          <option selected disabled value={""}>Select</option>
          <option value="Head Current">Head Current</option>
          <option value="Stern Current">Stern Current</option>
          <option value="Beam Current">Beam Current</option>
        </select>
   
        </div>
        </div>
      </div>
      <div className='mt-10'>
      <DefaultButton onclick={handleSubmit} text="Submit"></DefaultButton></div>
    </div>
  )
}

export default OfficerLogbook