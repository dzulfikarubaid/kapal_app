import React, { useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios';

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
    user: JSON.parse(localStorage.getItem('userData')!).id
  });
  const handleSubmit = () => {
    console.log(inputs)
    axios.post("http://sezero.pythonanywhere.com/ce-nr/", inputs)
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
  
  const renderEngineInputs = (engineType: string, engineCount: number) => {
    const engineInputs = [];
    for (let i = 1; i <= engineCount; i++) {
      engineInputs.push(
        <div key={`${engineType}${i}`} className='flex flex-row gap-4 items-center'>
          <select id={`${engineType}_type${i}`} name={`${engineType}_type${i}`} value={inputs[`${engineType}_type${i}`]} onChange={(e) => handleInputChange(`${engineType}_type${i}`, e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
            <option selected disabled value={""}>Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel type="text" value={inputs[`${engineType}${i}`]} onChange={(e) => handleInputChange(`${engineType}${i}`, e.target.value)} />
          <h1>Liter</h1>
        </div>
      );
    }
    return engineInputs;
  }
  // function Stock({ typevalue, typeOnChange, stockvalue, stockOnChange }: any) {
  //   return (
  //     <div className='flex flex-row gap-4  items-center'>
  //       <select id={`stock_type`} name={`stock_type`} value={typevalue} onChange={typeOnChange} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
  //         <option selected disabled value={""}>Type</option>
  //         <option value="HSD">HSD</option>
  //         <option value="MDO">MDO</option>
  //         <option value="LSFO">LSFO</option>
  //       </select>
  //       <InputNoLabel type="text" value={stockvalue} onChange={stockOnChange} />
  //       <h1>Liter</h1>
  //     </div>
  //   )
  // }
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
      {renderEngineInputs('me', 3)}
      <h1>Auxiliary Engine</h1>
      {renderEngineInputs('ae', 3)}
      <h1>Boiler</h1>
      {renderEngineInputs('boiler', 3)}

      </div>
      <div className='flex flex-col gap-3'>
      <h1>Fuel Oil Consumption</h1>
      {renderEngineInputs('foc', 3)}
      <h1>Previous Remain</h1>
      {renderEngineInputs('pr', 3)}
      <h1>Remain</h1>
      {renderEngineInputs('remain', 3)}
    
      </div>
      </div>
      <div className='mt-5'>
<DefaultButton onclick={handleSubmit} text={"Submit"}></DefaultButton></div>
    </div>
  )
}

export default CeNr