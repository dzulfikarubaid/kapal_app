import React, { useMemo, useState } from 'react'
import { DefaultInput, TopBar1 } from './template_element'
import { useReactTable } from '@tanstack/react-table';
const DashboardEngineer = () => {
   const [inputs, setInputs] = useState({

    vessel_name: "",
    voyage_code: "",
  });
  // const data = useMemo(() => [
    
  // ])
  // const table = useReactTable({
  //   data, columns
  // })
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  return (
    <div><TopBar1></TopBar1>
    <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />
      
       </div>
       <table className="table-auto w-full">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
    </div>
  )
}

export default DashboardEngineer