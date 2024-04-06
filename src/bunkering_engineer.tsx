import React, { useState } from 'react'
import { DefaultInput, InputNoLabel, TopBar1 } from './template_element'

const BunkeringEngineer = () => {
  const [inputs, setInputs] = useState({

    route: "",
    vessel_name: "",

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
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  function Stock({ typevalue, typeOnChange, stockvalue, stockOnChange }: any) {
    return (
      <div className='flex flex-row gap-4  items-center'>
        <select id={`stock_type`} name={`stock_type`} value={typevalue} onChange={typeOnChange} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
          <option selected disabled value={""}>Type</option>
          <option value="HSD">HSD</option>
          <option value="MDO">MDO</option>
          <option value="LSFO">LSFO</option>
        </select>
        <InputNoLabel type="text" value={stockvalue} onChange={stockOnChange} />
        <h1>Liter</h1>
      </div>
    )
  }

  return (
    <div>
      <TopBar1></TopBar1>
      <div className='flex flex-wrap w-full justify-between'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <DefaultInput label="Route" type="text" value={inputs.route} onChange={(e: any) => handleInputChange("route", e.target.value)} />
        <DefaultInput label="Date" value={inputs.date} onChange={(e: any) => handleInputChange("date", e.target.value)}></DefaultInput>
        <div className='flex flex-col gap-2'>
        <h1>Time</h1>
        <div className='flex flex-row gap-3'>
        <InputNoLabel type="text" value={inputs.time} onChange={(e: any) => handleInputChange("time", e.target.value)} />
        <h1>WIB</h1></div></div>
      </div>
      <div className='flex flex-row w-full gap-20'>
        <div className='flex flex-col mt-10 gap-2'>
          <h1 className='font-bold'>Bunkering Stock</h1>
          <h1 >Last Bunker Stock</h1>
          <div className='flex flex-col gap-3'>
            <Stock stockvalue={inputs.stock1} typevalue={inputs.stock_type1} typeOnChange={(e: any) => handleInputChange("stock_type1", e.target.value)} stockOnChange={(e: any) => handleInputChange("stock1", e.target.value)}></Stock>
            <Stock stockvalue={inputs.stock2} typevalue={inputs.stock_type2} typeOnChange={(e: any) => handleInputChange("stock_type2", e.target.value)} stockOnChange={(e: any) => handleInputChange("stock2", e.target.value)}></Stock>
            <Stock stockvalue={inputs.stock3} typevalue={inputs.stock_type3} typeOnChange={(e: any) => handleInputChange("stock_type3", e.target.value)} stockOnChange={(e: any) => handleInputChange("stock3", e.target.value)}></Stock>


          </div>
        </div>
        <div className='flex flex-col mt-10 gap-3'>
          <h1 className='font-bold'>After Refueling</h1>
          <h1 >After Refueling Stock</h1>
           <div className='flex flex-col gap-3'>
            <Stock stockvalue={inputs.ar1} typevalue={inputs.ar_type1} typeOnChange={(e: any) => handleInputChange("ar_type1", e.target.value)} stockOnChange={(e: any) => handleInputChange("ar1", e.target.value)}></Stock>
            <Stock stockvalue={inputs.ar2} typevalue={inputs.ar_type2} typeOnChange={(e: any) => handleInputChange("ar_type2", e.target.value)} stockOnChange={(e: any) => handleInputChange("ar2", e.target.value)}></Stock>
            <Stock stockvalue={inputs.ar3} typevalue={inputs.ar_type3} typeOnChange={(e: any) => handleInputChange("ar_type3", e.target.value)} stockOnChange={(e: any) => handleInputChange("ar3", e.target.value)}></Stock>


          </div>
        </div>
      </div>
    </div>
  )
}

export default BunkeringEngineer