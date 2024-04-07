import React from 'react';
import { BiArrowBack, BiLogOut } from 'react-icons/bi'


export const DefaultInput = ({ label, id, name, type, value, onChange, className }:any) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id}>{label}</label>
      <input
        className="px-2 py-1 rounded-xl border-[1px] border-gray-300 focus:outline-none focus:border-indigo-500 "
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const InputNoLabel = ({ id, name, type, value, onChange, className }:any) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input
        className="px-2 py-1 rounded-xl border-[1px] border-gray-300 focus:outline-none focus:border-indigo-500 "
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export function DefaultButton({onclick, text}:any){
    return(
        <button onClick={onclick} className='bg-indigo-500 text-white px-4 py-1 rounded-xl w-full'>{text}</button>
    )
}

function SignOut() {
  localStorage.clear();
  window.location.href = '/';
}
export const TopBar1 = () => {
  return (
    <div className='py-4 justify-between items-center flex flex-row'>
    <button onClick={()=>window.history.back()}><BiArrowBack size={25}></BiArrowBack></button>
   <button className='border-2 border-black p-2 rounded-xl ' onClick={SignOut}>Sign Out</button>
    </div>
  )
}
export const TopBar2 = () => {
  return (
    <div className='py-4 items-center flex flex-row-reverse'>

       <button className='border-2 border-black p-2 rounded-xl ' onClick={SignOut}>Sign Out</button>
    </div>
  )
}

export const TopBar3 = () => {
  return (
    <div className='py-4 justify-between items-center flex flex-row'>
    <button onClick={()=>window.history.back()}><BiArrowBack size={25}></BiArrowBack></button>
    
    </div>
  )
}


export const BigButton = ({href, children}:any) => {
  return (
    <a className='p-4 rounded-xl bg-indigo-500 text-white' href={href}>{children}</a>
  )
}

export function MainEngine({ engineNumber, rhOnChange, rhValue, rpmOnChange, rpmValue, focValue, focOnChange, fucValue, fucOnChange  }:any) {
  return (
    <div className='w-full'>
      <h1 className="font-bold mt-6 mb-4">Main Engine {engineNumber}</h1>
      <div className="flex flex-col gap-4">
        <DefaultInput label="Running Hours" id={`running_hours_me${engineNumber}`} name={`running_hours_me${engineNumber}`} type="text" value={rhValue} onChange={rhOnChange} />
        <DefaultInput label="RPM" id={`rpm_me${engineNumber}`} name={`rpm_me${engineNumber}`} type="text" value={rpmValue} onChange={rpmOnChange} />
        <label htmlFor={`fuel_oil_me${engineNumber}`}>Fuel Oil Consumption</label>
        <div className="flex flex-row gap-3 items-center">
          <select id={`fuel_oil_me${engineNumber}`} name={`fuel_oil_me${engineNumber}`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 " value={focValue} onChange={focOnChange}>
            <option value={""} selected disabled> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <div className='flex flex-row gap-3 items-center'>
          <InputNoLabel id={`fuc_me${engineNumber}`} name={`fuc_me${engineNumber}`} type="text" value={fucValue} onChange={fucOnChange} />
          <h1>Liter</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export const AuxiliaryEngine = ({ engineNumber,rhOnChange, rhValue, loadOnChange, loadValue, focValue, focOnChange, fucValue, fucOnChange }:any) => {
  return (
    <div className='w-full'>
      <h1 className="font-bold mt-6 mb-4">Auxiliary Engine {engineNumber}</h1>
      <div className="flex flex-col gap-4">
        <DefaultInput label="Running Hours" id={`running_hours_ae${engineNumber}`} name={`running_hours_ae${engineNumber}`} type="text" value={rhValue} onChange={rhOnChange} />
        <DefaultInput label="Load (kW)" id={`load_ae${engineNumber}`} name={`load_ae${engineNumber}`} type="text" value={loadValue} onChange={loadOnChange} />
        <label htmlFor={`fuel_oil_ae${engineNumber}`}>Fuel Oil Consumption</label>
        <div className="flex flex-row gap-3 items-center justify-center items-center ">
          <select value={focValue} onChange={focOnChange} id={`fuel_oil_ae${engineNumber}`} name={`fuel_oil_ae${engineNumber}`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option selected disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_ae${engineNumber}`} name={`fuc_ae${engineNumber}`} type="text" value={fucValue} onChange={fucOnChange} />
          <h1>Liter</h1>
        </div>
      </div>
    </div>
  );
};



export const Boiler = ({rhOnChange, rhValue, focValue, focOnChange, fucValue, fucOnChange }:any) => {
  return (
    <div className='w-full'>
      <h1 className="font-bold mt-6 mb-4">Boiler</h1>
      <div className="flex flex-col gap-4">
        <DefaultInput label="Running Hours" id={`running_hours_boiler`} name={`running_hours_boiler`} type="text" value={rhValue} onChange={rhOnChange} />
       
        <label htmlFor={`fuel_oil_boiler`}>Fuel Oil Consumption</label>
        <div className="flex flex-row gap-3 items-center ">
          <select value={focValue} onChange={focOnChange} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option selected disabled value={""}> Type</option>
            <option value="HSD">HSD</option>
            <option value="MDO">MDO</option>
            <option value="LSFO">LSFO</option>
          </select>
          <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={fucValue} onChange={fucOnChange} />
          <h1>Liter</h1>
        </div>
      </div>
    </div>
  );
};