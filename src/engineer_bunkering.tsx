import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios';

const BunkeringEngineer = () => {
  const [inputs, setInputs] = useState({
    route: "",
    vessel_name: "",
    user: JSON.parse(localStorage.getItem('userData')!).id,
    date: "",
    time: "",
    stock_type1: "",
    stock1: "",
    stock_type2: "",
    stock2: "",
    stock_type3: "",
    stock3: "",
    ar1: "",
    ar2: "",
    ar3: "",
    ar_type1: "",
    ar_type2: "",
    ar_type3: "",
  });

  const handleInputChange = (fieldName: string, value: string) => {
    setInputs((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  }

  const handleSubmit = () => {
    axios.post("http://sezero.pythonanywhere.com/engineer-bunkering/", inputs)
      .then((response: any) => {
        console.log(response)
        alert("Success added bunkering data")
      })
      .catch((error: any) => {
        console.log(error)
        const errors = error.response.data;
        let error_message = "";
        Object.keys(errors).forEach(key => {
          error_message += `${key}: ${errors[key]}\n`
        });
        alert(error_message)
      })
  }

  return (
    <div>
      <TopBar1></TopBar1>
      <div className='flex flex-wrap w-full justify-between'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />
        <DefaultInput label="Route" type="text" value={inputs.route} onChange={(e: any) => handleInputChange("route", e.target.value)} />
        <DefaultInput type="date" label="Date" value={inputs.date} onChange={(e: any) => handleInputChange("date", e.target.value)} />
        <div className='flex flex-col gap-2'>
          <h1>Time</h1>
          <div className='flex flex-row gap-3'>
            <InputNoLabel type="text" value={inputs.time} onChange={(e: any) => handleInputChange("time", e.target.value)} />
            <h1>WIB</h1>
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full gap-20'>
        <div className='flex flex-col mt-10 gap-3'>
          <h1 className='font-bold'>Bunkering Stock</h1>
          <h1>Last Bunker Stock</h1>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-4 items-center'>
              <select id={`stock_type1`} name={`stock_type1`} value={inputs.stock_type1} onChange={(e: any) => handleInputChange("stock_type1", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option selected disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" value={inputs.stock1} onChange={(e: any) => handleInputChange("stock1", e.target.value)} />
              <h1>Liter</h1>
            </div>
            <div className='flex flex-row gap-4 items-center'>
              <select id={`stock_type2`} name={`stock_type2`} value={inputs.stock_type2} onChange={(e: any) => handleInputChange("stock_type2", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option selected disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" value={inputs.stock2} onChange={(e: any) => handleInputChange("stock2", e.target.value)} />
              <h1>Liter</h1>
            </div>
            <div className='flex flex-row gap-4 items-center'>
              <select id={`stock_type3`} name={`stock_type3`} value={inputs.stock_type3} onChange={(e: any) => handleInputChange("stock_type3", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option selected disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" value={inputs.stock3} onChange={(e: any) => handleInputChange("stock3", e.target.value)} />
              <h1>Liter</h1>
            </div>
          </div>
        </div>
        <div className='flex flex-col mt-10 gap-3'>
          <h1 className='font-bold'>After Refueling</h1>
          <h1>After Refueling Stock</h1>
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-4 items-center'>
              <select id={`ar_type1`} name={`ar_type1`} value={inputs.ar_type1} onChange={(e: any) => handleInputChange("ar_type1", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option selected disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" value={inputs.ar1} onChange={(e: any) => handleInputChange("ar1", e.target.value)} />
              <h1>Liter</h1>
            </div>
            <div className='flex flex-row gap-4 items-center'>
              <select id={`ar_type2`} name={`ar_type2`} value={inputs.ar_type2} onChange={(e: any) => handleInputChange("ar_type2", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option selected disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" value={inputs.ar2} onChange={(e: any) => handleInputChange("ar2", e.target.value)} />
              <h1>Liter</h1>
            </div>
            <div className='flex flex-row gap-4 items-center'>
              <select id={`ar_type3`} name={`ar_type3`} value={inputs.ar_type3} onChange={(e: any) => handleInputChange("ar_type3", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option selected disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" value={inputs.ar3} onChange={(e: any) => handleInputChange("ar3", e.target.value)} />
              <h1>Liter</h1>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <DefaultButton onclick={handleSubmit} text={"Submit"}></DefaultButton>
      </div>
    </div>
  )
}

export default BunkeringEngineer
