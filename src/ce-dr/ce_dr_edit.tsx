import React, { ChangeEvent, useEffect, useState } from 'react';
import { TopBar1, DefaultInput2, MainEngine, AuxiliaryEngine, Boiler, DefaultButton, InputNoLabel, TopBar3, MainEngine2, AuxiliaryEngine2, Boiler2 } from '../template_element';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const CrDrEdit: React.FC = () => {
    const { id } = useParams();
    console.log(id)
    const [databyid, setDatabyid] = useState<any>([])
    useEffect(() => {
    axios.get("http://sezero.pythonanywhere.com/engineer-dashboard", {
      headers: {

      }
    })
      .then((response: any) => {
        console.log(response.data)
        const databyid = response.data.filter((item: any) => item.id == id)
        console.log(databyid[0].route)
        setDatabyid(databyid)

        // Periksa dan isi field kosong dengan data dari databyid
        const newInputs:any = { ...inputs };
        Object.keys(newInputs).forEach((key) => {
          if (!newInputs[key] && databyid[0][key]) {
            newInputs[key] = databyid[0][key];
          }
        });
        setInputs(newInputs);
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, []);

  const [inputs, setInputs] = useState({
    user: JSON.parse(localStorage.getItem('userData')!).id,
    rhme1: "",
    rhme2: "",
    rpmme1: "",
    rpmme2: "",
    typeme1: "",
    typeme2: "",
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
    typeae1: "",
    typeae2: "",
    typeae3: "",
    typeae4: "",
    fucae1: "",
    fucae2: "",
    fucae3: "",
    fucae4: "",
    date: "",
    time1: "",
    time2: "",
    rhboiler: "",
    typeboiler: "",
    fucboiler: "",
    
    route:"",
    vessel_name:"",
    voyage_code:"",
    correction_type1: "",
    correction1: "",
    correction_type2: "",
    correction2: "",
  });

  const handleInputChange = (fieldName: any, value: string) => {
    setInputs(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  const handleSubmit = () => { 
    console.log(inputs)
    axios.patch(`http://sezero.pythonanywhere.com/engine-update/${id}/`, inputs)
    .then((response:any)=>{
      console.log(response)
      alert("Success update data")
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
  
  return (
    <div>

      {
        databyid.length > 0  &&
        <div>
      <TopBar3 />
      <div className='flex flex-wrap gap-4 w-full gap-x-20'>
        <DefaultInput2 label="Vessel Name" type="text" defaultValue={databyid[0].vessel_name} onChange={(e:any) => handleInputChange("vessel_name", e.target.value)} />
        <DefaultInput2 label="Voyage Code"  type="text" defaultValue={databyid[0].voyage_code} onChange={(e:any) => handleInputChange("voyage_code", e.target.value)} />
        <DefaultInput2 defaultValue={databyid[0].route} label="Route"  type="text"  onChange={(e:any) => handleInputChange("route", e.target.value)} />
        <DefaultInput2 defaultValue={databyid[0].date} type="date" label="Date"  onChange={(e:any)=>handleInputChange("date", e.target.value)}></DefaultInput2>
        <div className='flex flex-col'>
        <h1>Time Periode</h1>
        <div className='flex flex-row gap-4 justify-center items-center'>
        <InputNoLabel defaultValue={databyid[0].time1} onChange={(e:any)=>handleInputChange("time1", e.target.value)}></InputNoLabel>
        <h1>WIB</h1>
        <h1>-</h1>
        <InputNoLabel defaultValue={databyid[0].time2} onChange={(e:any)=>handleInputChange("time2", e.target.value)}></InputNoLabel>
        WIB
        </div>
        </div>


      </div>
      <div className='flex flex-row justify-center gap-10 w-full'>

        <MainEngine2
          engineNumber={1}
          rhValue={databyid[0].rhme1}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhme1", e.target.value)}
          rpmValue={databyid[0].rpmme1}
          rpmOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rpmme1", e.target.value)}
          typeValue={databyid[0].typeme1}
          typeOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("typeme1", e.target.value)}
          fucValue={databyid[0].fucme1}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucme1", e.target.value)}
        />
        <MainEngine2
          engineNumber={2}
          rhValue={databyid[0].rhme2}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhme2", e.target.value)}
          rpmValue={databyid[0].rpmme2}
          rpmOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rpmme2", e.target.value)}
          typeValue={databyid[0].typeme2}
          typeOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("typeme2", e.target.value)}
          fucValue={databyid[0].fucme2}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucme2", e.target.value)}
        />
      </div>
      {/* Auxiliary Engines */}
      <div className='flex flex-row justify-center gap-10 w-full'>
        <AuxiliaryEngine2
          engineNumber={1}
          rhValue={databyid[0].rhae1}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae1", e.target.value)}
          loadValue={databyid[0].loadae1}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae1", e.target.value)}
          typeValue={databyid[0].typeae1}
          typeOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("typeae1", e.target.value)}
          fucValue={databyid[0].fucae1}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae1", e.target.value)}
        />
        <AuxiliaryEngine2
          engineNumber={2}
          rhValue={databyid[0].rhae2}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae2", e.target.value)}
          loadValue={databyid[0].loadae2}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae2", e.target.value)}
          typeValue={databyid[0].typeae2}
          typeOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("typeae2", e.target.value)}
          fucValue={databyid[0].fucae2}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae2", e.target.value)}
        />

      </div>
      <div className='flex flex-row justify-center gap-10 w-full'>
        <AuxiliaryEngine2
          engineNumber={3}
          rhValue={databyid[0].rhae3}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae3", e.target.value)}
          loadValue={databyid[0].loadae3}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae3", e.target.value)}
          typeValue={databyid[0].typeae3}
          typeOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("typeae3", e.target.value)}
          fucValue={databyid[0].fucae3}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae3", e.target.value)}
        />
        <AuxiliaryEngine2
          engineNumber={4}
          rhValue={databyid[0].rhae4}
          rhOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("rhae4", e.target.value)}
          loadValue={databyid[0].loadae4}
          loadOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("loadae4", e.target.value)}
          typeValue={databyid[0].typeae4}
          typeOnChange={(e: ChangeEvent<HTMLSelectElement>) => handleInputChange("typeae4", e.target.value)}
          fucValue={databyid[0].fucae4}
          fucOnChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("fucae4", e.target.value)}
        /></div>
      <div className='flex flex-row justify-center gap-10 w-full'>
        <Boiler2 rhOnChange={(e:any)=>handleInputChange("rhboiler", e.target.value)} rhValue={databyid[0].rhboiler} typeValue={databyid[0].typeboiler} typeOnChange={(e:any)=>handleInputChange("typeboiler", e.target.value)} fucValue={databyid[0].fucboiler} fucOnChange={(e:any)=>handleInputChange("fucboiler", e.target.value)}></Boiler2>
        <div className='w-full pt-5 flex flex-col justify-between'>
          <div className=''>
            <label htmlFor={`fuel_oil_boiler`}>Fuel Oil Correction</label>
            <div className="flex flex-row gap-3 items-center mt-2 ">
              <select id={`correction_type`} name={`correction_type`} value={databyid[0].correction_type1} onChange={(e:any)=>handleInputChange("correction_type1", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option  disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" defaultValue={databyid[0].correction1} onChange={(e:any) => handleInputChange("correction1", e.target.value)} />
              <h1>Liter</h1>
            </div>
            <div className="flex flex-row gap-3 items-center mt-2 ">
              <select id={`correction_type`} name={`correction_type`} defaultValue={databyid[0].correction_type2} onChange={(e:any)=>handleInputChange("correction_type2", e.target.value)} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2 py-1 ">
                <option  disabled value={""}>Type</option>
                <option value="HSD">HSD</option>
                <option value="MDO">MDO</option>
                <option value="LSFO">LSFO</option>
              </select>
              <InputNoLabel type="text" defaultValue={databyid[0].correction2} onChange={(e:any) => handleInputChange("correction2", e.target.value)} />
              <h1>Liter</h1>
            </div>
            </div>
          
        </div>
      </div>
<div className='mt-5'>
<DefaultButton onclick={handleSubmit} text={"Save"}></DefaultButton></div>
    </div>
      }
    
    </div>
  )
}

export default CrDrEdit;
