import React, { ChangeEvent, useState } from 'react';
import { TopBar1, DefaultInput, MainEngine, AuxiliaryEngine, Boiler, DefaultButton } from './template_element';
import DateTimePicker from "react-tailwindcss-datetimepicker";
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
    fucae4: ""
  });

  const handleInputChange = (fieldName:any, value: string) => {
    setInputs(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  const now = new Date();
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

const endOfToday = new Date(startOfToday);
endOfToday.setDate(endOfToday.getDate() + 1);
endOfToday.setSeconds(endOfToday.getSeconds() - 1);
  const handleSubmit = () => {
    // Lakukan sesuatu dengan nilai inputs yang telah diatur
  }
const [selectedRange, setSelectedRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 2)),
    end: endOfToday,
  });

  function handleApply(startDate: Date, endDate: Date) {
    setSelectedRange({ start: startDate, end: endDate });
  }
  return (
    <div>
      <TopBar1 />
        <div className='flex flex-wrap gap-4 w-full gap-x-20'>
        <DefaultInput label="Vessel Name" id={`fuc_ae`} name={`fuc_ae`} type="text" value="" onChange={() => {}} />
          <DefaultInput label="Voyage Code" id={`fuc_ae`} name={`fuc_ae`} type="text" value="" onChange={() => {}} />
            <DefaultInput label="Route" id={`fuc_ae`} name={`fuc_ae`} type="text" value="" onChange={() => {}} />
              <h1>Date and time</h1>
              <div className='rounded-xl border-[1px]'>
              <DateTimePicker
      ranges={{
        Today: [new Date(startOfToday), new Date(endOfToday)],
        "Last 30 Days": [
          new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate(),
            0,
            0,
            0,
            0
          ),
          new Date(endOfToday),
        ],
      }}
   
      start={selectedRange.start}
      end={selectedRange.end}
      applyCallback={handleApply}
      theme="purple"
    >
      <button type="button">{`${selectedRange.start} - ${selectedRange.end}`}</button>
    </DateTimePicker>
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
       <Boiler engineNumber={1}></Boiler>
        <div className='w-full pt-5 flex flex-col justify-between'>
        <div>
        <label htmlFor={`fuel_oil_ae`}>Fuel Oil Correction</label>
        <div className="flex flex-row gap-3 items-center ">
          <select id={`fuel_oil_ae`} name={`fuel_oil_ae`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option selected disabled>Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <DefaultInput label="" id={`fuc_ae`} name={`fuc_ae`} type="text" value="" onChange={() => {}} />
          <h1>Liter</h1>
        </div></div>
        <DefaultButton onclick={handleSubmit} text={"Submit"}></DefaultButton>
        </div>
       </div>
      
    </div>
  )
}

export default LogbookEngineer;
