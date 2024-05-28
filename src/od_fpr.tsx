import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'

const OdFpr = () => {
    const [vn, setVn] = useState("")
    const [vc, setVc] = useState("")
    const [route, setRoute] = useState("")
  return (
    <div>
    <TopBar1></TopBar1>
      <div className='flex flex-col gap-4'>
    <h1 className='text-center font-bold text-xl'>Fuel Procurement Request Form</h1>
    <DefaultInput label="Vessel Name" type="text" ></DefaultInput>
    <DefaultInput label="Voyage Code" type="text" ></DefaultInput>
     <DefaultInput label="Route" type="text" ></DefaultInput>
      <label htmlFor={`fuel_oil_boiler`}>Bunkering Planning</label>
       <div className="flex flex-row gap-3 items-center ">  
          <select value={vn} onChange={(e) => setVn(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option defaultValue="" disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={vc} onChange={(e:any) => setVc(e.target.value)} />
          <h1>Liter</h1>
        </div>
         <div className="flex flex-row gap-3 items-center ">
          <select value={vn} onChange={(e) => setVn(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option defaultValue="" disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={vc} onChange={(e:any) => setVc(e.target.value)} />
          <h1>Liter</h1>
        </div>
         <div className="flex flex-row gap-3 items-center ">
          <select value={vn} onChange={(e) => setVn(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option defaultValue="" disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={vc} onChange={(e:any) => setVc(e.target.value)} />
          <h1>Liter</h1>
        </div>
        <div className='mt-6'>
        <DefaultButton text="Submit"></DefaultButton>
        </div>
       

      </div>
    </div>
  )
}

export default OdFpr