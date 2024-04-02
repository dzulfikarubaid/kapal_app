import React from 'react'
import { TopBar1, DefaultInput, MainEngine, AuxiliaryEngine, Boiler, DefaultButton } from './template_element'



const logbookMasinis = () => {
  return (
    <div>
    <TopBar1></TopBar1>
    
    <div className='flex flex-row justify-center gap-10 w-full'>
    <MainEngine engineNumber={1}></MainEngine>
    <MainEngine engineNumber={2}></MainEngine>
    
    </div>
   <div className='flex flex-row justify-center gap-10 w-full'>
    <AuxiliaryEngine engineNumber={1}></AuxiliaryEngine>
     <AuxiliaryEngine engineNumber={2}></AuxiliaryEngine>
     
       </div>
       <div className='flex flex-row justify-center gap-10 w-full'>
    <AuxiliaryEngine engineNumber={3}></AuxiliaryEngine>
     <AuxiliaryEngine engineNumber={4}></AuxiliaryEngine>
     
       </div>
       <div className='flex flex-row justify-center gap-10 w-full'>
       <Boiler engineNumber={1}></Boiler>
        <div className='w-full pt-5 flex flex-col justify-between'>
        <div>
        <label htmlFor={`fuel_oil_ae`}>Fuel Oil Correction</label>
        <div className="flex flex-row gap-3 items-center ">
          <select id={`fuel_oil_ae`} name={`fuel_oil_ae`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option selected disabled>Pilih jenis fuel oil</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <DefaultInput label="" id={`fuc_ae`} name={`fuc_ae`} type="text" value="" onChange={() => {}} />
          <h1>Liter</h1>
        </div></div>
        <DefaultButton onclick={()=>{}} text={"Submit"}></DefaultButton>
        </div>
       </div>
    </div>
  )
}

export default logbookMasinis