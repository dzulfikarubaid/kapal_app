import React, { useEffect, useMemo, useState } from 'react'
import { DefaultInput, TopBar1 } from './template_element'
import axios from 'axios';
import { access } from 'original-fs';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
const DashboardEngineer = () => {
   const [inputs, setInputs] = useState({

    vessel_name: "",
    voyage_code: "",
  })
const MultipleHeaderTable = () => {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th rowSpan={2}>Route</th>
          <th colSpan={2}>Time Period</th>
          <th rowSpan={2}>Duration</th>
          <th colSpan={3}>Main Engine 1</th>
        </tr>

        <tr>
          <th>Start</th>
          <th>Finish</th>
        </tr>
        <tr>
          <th colSpan={2}>Running Hours</th>
          <th colSpan={2}>RPM</th>
          <th colSpan={2}>Fuel Oil Consumption</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Route 1</td>
          <td>8:00 AM</td>
          <td>10:00 AM</td>
          <td>2 hours</td>
        </tr>
        <tr>
          <td>Route 2</td>
          <td>11:00 AM</td>
          <td>1:00 PM</td>
          <td>2 hours</td>
        </tr>
        {/* Add more rows as needed */}
      </tbody>
    </table>
  );
};


  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get("http://sezero.pythonanywhere.com/engineer-dr", {headers:{

    }})
    .then((response:any)=>{
      console.log(response.data)
      setData(response.data)
    })
    .catch((error:any)=>{
      console.log(error)
    })
  },[])
  const dataRecap = useMemo(() => data, [])
  const columns = [
    {
      header: 'Route',
      accessorKey: 'route',
    },
    {
      header: 'Time Period',
      columns: [
        {
          header: 'Start',
        accessorKey: 'time1'},
        {
          header: 'Finish',
        accessorKey: 'time2'}

      ]
    }
  ]
  const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()})
  return (
    <div>
      <TopBar1></TopBar1>
    <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />
      
    </div>
    <table className='w-full border-2 mt-5'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='border-2'>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='border-2'>
                {flexRender(
                  header.isPlaceholder ? null : header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className='border-2' key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className='border-2' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}

            </tr>
          ))} 
        </tbody>
    </table>
    </div>
  )
}

export default DashboardEngineer