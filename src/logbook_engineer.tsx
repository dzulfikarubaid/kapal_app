import React, { ChangeEvent, useState } from 'react';
import { TopBar1, DefaultInput, MainEngine, AuxiliaryEngine, Boiler, DefaultButton, InputNoLabel } from './template_element';
const LogbookEngineer: React.FC = () => {
  const [inputs, setInputs] = useState({
    rhme1: "",
    rhme2: "",
    rpmme1: "",
    rpmme2: "",
    focme1: "",
    focme2: "",
    fucme1: "",
    fucme2: "",
    rhae1: "",
    rhae2: "",
    rhae3: "",
    rhae4: "",
    loadae1: "",
    loadae2: "",
    loadae3: "",
    loadae4: "",
    focae1: "",
    focae2: "",
    focae3: "",
    focae4: "",
    fucae1: "",
    fucae2: "",
    fucae3: "",
    fucae4: "",
    date: "",
    time1: "",
    time2: "",
    rhboiler: "",
    focboiler: "",
    fucboiler: "",
    correction_type: "",
    route:"",
    vessel_name:"",
    voyage_code:"",
    correction: ""
  });

  const handleInputChange = (fieldName: any, value: string) => {
    setInputs(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  const handleSubmit = () => { 

  }
  
  return (
    <div>
      <TopBar1 />
      <div className='flex flex-wrap gap-4 w-full gap-x-20'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e:any) => handleInputChange("vessel_name", e.target.value)} />
        <DefaultInput label="Voyage Code"  type="text" value={inputs.voyage_code} onChange={(e:any) => handleInputChange("voyage_code", e.target.value)} />
        <DefaultInput label="Route"  type="text" value={inputs.route} onChange={(e:any) => handleInputChange("route", e.target.value)} />
        <DefaultInput label="Date" value={inputs.date} onChange={(e:any)=>handleInputChange("date", e.target.value)}></DefaultInput>
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
      <div className='flex flex-row justify-center gap-10 w-full'>

        <MainEngine
          engineNumber={1}
          rhValue={inputs.rhme1}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhme1", e.target.value)}
          rpmValue={inputs.rpmme1}
          rpmOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rpmme1", e.target.value)}
          focValue={inputs.focme1}
          focOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("focme1", e.target.value)}
          fucValue={inputs.fucme1}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucme1", e.target.value)}
        />
        <MainEngine
          engineNumber={2}
          rhValue={inputs.rhme2}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhme2", e.target.value)}
          rpmValue={inputs.rpmme2}
          rpmOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rpmme2", e.target.value)}
          focValue={inputs.focme2}
          focOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("focme2", e.target.value)}
          fucValue={inputs.fucme2}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucme2", e.target.value)}
        />
      </div>
      {/* Auxiliary Engines */}
      <div className='flex flex-row justify-center gap-10 w-full'>
        <AuxiliaryEngine
          engineNumber={1}
          rhValue={inputs.rhae1}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae1", e.target.value)}
          loadValue={inputs.loadae1}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae1", e.target.value)}
          focValue={inputs.focae1}
          focOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("focae1", e.target.value)}
          fucValue={inputs.fucae1}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae1", e.target.value)}
        />
        <AuxiliaryEngine
          engineNumber={2}
          rhValue={inputs.rhae2}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae2", e.target.value)}
          loadValue={inputs.loadae2}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae2", e.target.value)}
          focValue={inputs.focae2}
          focOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("focae2", e.target.value)}
          fucValue={inputs.fucae2}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae2", e.target.value)}
        />

      </div>
      <div className='flex flex-row justify-center gap-10 w-full'>
        <AuxiliaryEngine
          engineNumber={3}
          rhValue={inputs.rhae3}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae3", e.target.value)}
          loadValue={inputs.loadae3}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae3", e.target.value)}
          focValue={inputs.focae3}
          focOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("focae3", e.target.value)}
          fucValue={inputs.fucae3}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae3", e.target.value)}
        />
        <AuxiliaryEngine
          engineNumber={4}
          rhValue={inputs.rhae4}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae4", e.target.value)}
          loadValue={inputs.loadae4}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae4", e.target.value)}
          focValue={inputs.focae4}
          focOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("focae4", e.target.value)}
          fucValue={inputs.fucae4}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae4", e.target.value)}
        /></div>
      <div className='flex flex-row justify-center gap-10 w-full'>
        <Boiler rhOnChange={(e:any)=>handleInputChange("rhboiler", e.target.value)} rhValue={inputs.rhboiler} focValue={inputs.focboiler} focOnChange={(e:any)=>handleInputChange("focboiler", e.target.value)} fucValue={inputs.fucboiler} fucOnChange={(e:any)=>handleInputChange("fucboiler", e.target.value)}></Boiler>
        <div className='w-full pt-5 flex flex-col justify-between'>
          <div className=''>
            <label htmlFor={`fuel_oil_boiler`}>Fuel Oil Correction</label>
            <div className="flex flex-row gap-3 items-center mt-2 ">
              <select id={`correction_type`} name={`correction_type`} value={inputs.correction_type} onChange={(e:any)=>handleInputChange("correction_type", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option selected disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" value={inputs.correction} onChange={(e:any) => handleInputChange("correction", e.target.value)} />
              <h1>Liter</h1>
            </div></div>
          <DefaultButton onclick={handleSubmit} text={"Submit"}></DefaultButton>
        </div>
      </div>

    </div>
  )
}

export default LogbookEngineer;
