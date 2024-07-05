import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios'

const OdFpr = () => {
    const [vn, setVn] = useState("")
    const [vc, setVc] = useState("")
    const [route, setRoute] = useState("")
    const [br1Type, setBr1Type] = useState("")
    const [br2Type, setBr2Type] = useState("")
    const [br3Type, setBr3Type] = useState("")
    const [br1Value, setBr1Value] = useState("")
    const [br2Value, setBr2Value] = useState("")
    const [br3Value, setBr3Value] = useState("")
    const handleSubmit = () => {
      axios.post("https://sezero.pythonanywhere.com/fpr/", {
        vessel_name: vn,
        voyage_code: vc,
        route: route,
        br1type: br1Type,
        br1value: br1Value,
        br2type: br2Type,
        br2value: br2Value,
        br3type: br3Type,
        br3value: br3Value,
        user: JSON.parse(localStorage.getItem('userData')!).id
      })
        .then((response) => {
          console.log(response.data)
          history.back()
        })
        .catch((error) => {
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
      <div className='flex flex-col gap-4'>
    <h1 className='text-center font-bold text-xl'>Fuel Procurement Request Form</h1>
    <DefaultInput value={vn} onChange={(e:any) => setVn(e.target.value)} label="Vessel Name" type="text" ></DefaultInput>
    <DefaultInput value={vc} onChange={(e:any) => setVc(e.target.value)} label="Voyage Code" type="text" ></DefaultInput>
     <DefaultInput value={route} onChange={(e:any) => setRoute(e.target.value)} label="Route" type="text" ></DefaultInput>
      <label htmlFor={`fuel_oil_boiler`}>Bunkering Planning</label>
       <div className="flex flex-row gap-3 items-center ">  
          <select value={br1Type} onChange={(e) => setBr1Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option defaultValue="" disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={br1Value} onChange={(e:any) => setBr1Value(e.target.value)} />
          <h1>Liter</h1>
        </div>
         <div className="flex flex-row gap-3 items-center ">
          <select value={br2Type} onChange={(e) => setBr2Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option defaultValue="" disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={br2Value} onChange={(e:any) => setBr2Value(e.target.value)} />
          <h1>Liter</h1>
        </div>
         <div className="flex flex-row gap-3 items-center ">
          <select value={br3Type} onChange={(e) => setBr3Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option defaultValue="" disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={br3Value} onChange={(e:any) => setBr3Value(e.target.value)} />
          <h1>Liter</h1>
        </div>
        <div className='mt-6'>
        <DefaultButton onclick={() => handleSubmit()} text="Submit"></DefaultButton>
        </div>
       

      </div>
    </div>
  )
}

export default OdFpr