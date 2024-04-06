import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'

const CeNr = () => {
   const [inputs, setInputs] = useState({

    vessel_name: "",
    voyage_code: "",
    date:"",
    me_type1:"",
    me1:"",
    me_type2:"",
    me2:"",
    me_type3:"",
    me3:"",
    // buat untuk ae 1 2 3
    ae_type1:"",
    ae1:"",
    ae_type2:"",
    ae2:"",
    ae_type3:"",
    ae3:"",
    boiler_type1:"",
    boiler1:"",
    boiler_type2:"",
    boiler2:"",
    boiler_type3:"",
    boiler3:"",
    foc_type1:"",
    foc1:"",
    foc_type2:"",
    foc2:"",
    foc_type3:"",
    foc3:"",
    pr_type1:"",
    pr1:"",
    pr_type2:"",
    pr2:"",
    pr_type3:"",
    pr3:"",
    remain_type1:"",
    remain1:"",
    remain_type2:"",
    remain2:"",
    remain_type3:"",
    remain3:"",
  });
  function handleSubmit(){

  }
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
    <div><TopBar1></TopBar1>
    <div className='flex flex-wrap w-full justify-between'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />
        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />
        <DefaultInput label="Date" type="date" value={inputs.date} onChange={(e: any) => handleInputChange("date", e.target.value)}></DefaultInput>

      </div>
      <div className='mt-10 flex flex-row gap-16'>
      <div className='flex flex-col gap-3'>
      <h1>Main Engine</h1>
      <Stock typevalue={inputs.me_type1} typeOnChange={(e:any)=>handleInputChange('me_type1', e.target.value)} stockvalue={inputs.me1} onChange={(e:any)=>handleInputChange('me1', e.target.value)}></Stock>
    <Stock typevalue={inputs.me_type2} typeOnChange={(e:any)=>handleInputChange('me_type2', e.target.value)} stockvalue={inputs.me2} onChange={(e:any)=>handleInputChange('me2', e.target.value)}></Stock>
    <Stock typevalue={inputs.me_type3} typeOnChange={(e:any)=>handleInputChange('me_type3', e.target.value)} stockvalue={inputs.me3} onChange={(e:any)=>handleInputChange('me3', e.target.value)}></Stock>
      <h1>Auxiliary Engine</h1>
    <Stock typevalue={inputs.ae_type1} typeOnChange={(e:any)=>handleInputChange('ae_type1', e.target.value)} stockvalue={inputs.ae1} onChange={(e:any)=>handleInputChange('ae1', e.target.value)}></Stock>
    <Stock typevalue={inputs.ae_type2} typeOnChange={(e:any)=>handleInputChange('ae_type2', e.target.value)} stockvalue={inputs.ae2} onChange={(e:any)=>handleInputChange('ae2', e.target.value)}></Stock>
    <Stock typevalue={inputs.ae_type3} typeOnChange={(e:any)=>handleInputChange('ae_type3', e.target.value)} stockvalue={inputs.ae3} onChange={(e:any)=>handleInputChange('ae3', e.target.value)}></Stock>
      <h1>Boiler</h1>
    <Stock typevalue={inputs.boiler_type1} typeOnChange={(e:any)=>handleInputChange('boiler_type1', e.target.value)} stockvalue={inputs.boiler1} onChange={(e:any)=>handleInputChange('boiler1', e.target.value)}></Stock>
    <Stock typevalue={inputs.boiler_type2} typeOnChange={(e:any)=>handleInputChange('boiler_type2', e.target.value)} stockvalue={inputs.boiler2} onChange={(e:any)=>handleInputChange('boiler2', e.target.value)}></Stock>
    <Stock typevalue={inputs.boiler_type3} typeOnChange={(e:any)=>handleInputChange('boiler_type3', e.target.value)} stockvalue={inputs.boiler3} onChange={(e:any)=>handleInputChange('boiler3', e.target.value)}></Stock>
      </div>
      <div className='flex flex-col gap-3'>
      <h1>Fuel Oil Consumption</h1>
    <Stock typevalue={inputs.foc_type1} typeOnChange={(e:any)=>handleInputChange('foc_type1', e.target.value)} stockvalue={inputs.foc1} onChange={(e:any)=>handleInputChange('foc1', e.target.value)}></Stock>
    <Stock typevalue={inputs.foc_type2} typeOnChange={(e:any)=>handleInputChange('foc_type2', e.target.value)} stockvalue={inputs.foc2} onChange={(e:any)=>handleInputChange('foc2', e.target.value)}></Stock>
    <Stock typevalue={inputs.foc_type3} typeOnChange={(e:any)=>handleInputChange('foc_type3', e.target.value)} stockvalue={inputs.foc3} onChange={(e:any)=>handleInputChange('foc3', e.target.value)}></Stock>
      <h1>Previous Remain</h1>
    <Stock typevalue={inputs.pr_type1} typeOnChange={(e:any)=>handleInputChange('pr_type1', e.target.value)} stockvalue={inputs.pr1} onChange={(e:any)=>handleInputChange('pr1', e.target.value)}></Stock>
    <Stock typevalue={inputs.pr_type2} typeOnChange={(e:any)=>handleInputChange('pr_type2', e.target.value)} stockvalue={inputs.pr2} onChange={(e:any)=>handleInputChange('pr2', e.target.value)}></Stock>
    <Stock typevalue={inputs.pr_type3} typeOnChange={(e:any)=>handleInputChange('pr_type3', e.target.value)} stockvalue={inputs.pr3} onChange={(e:any)=>handleInputChange('pr3', e.target.value)}></Stock>
      <h1>Remain</h1>
    <Stock typevalue={inputs.remain_type1} typeOnChange={(e:any)=>handleInputChange('remain_type1', e.target.value)} stockvalue={inputs.remain1} onChange={(e:any)=>handleInputChange('remain1', e.target.value)}></Stock>
    <Stock typevalue={inputs.remain_type2} typeOnChange={(e:any)=>handleInputChange('remain_type2', e.target.value)} stockvalue={inputs.remain2} onChange={(e:any)=>handleInputChange('remain2', e.target.value)}></Stock>
    <Stock typevalue={inputs.remain_type3} typeOnChange={(e:any)=>handleInputChange('remain_type3', e.target.value)} stockvalue={inputs.remain3} onChange={(e:any)=>handleInputChange('remain3', e.target.value)}></Stock>
      </div>
      </div>
      <div className='mt-5'>
<DefaultButton onclick={handleSubmit} text={"Submit"}></DefaultButton></div>
    </div>
  )
}

export default CeNr