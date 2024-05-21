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

  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  const [data, setData] = useState([])
  useEffect(()=>{
    axios.get("http://sezero.pythonanywhere.com/engineer-dashboard", {headers:{

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
      header: 'Time Period',
      columns: [
        {
          header: 'First Name',
          accessorKey: 'time1',
        },
        {
          header: 'Last Name',
          accessorKey: 'time2',
        },
      ],
    },
    {
      header: 'Info',
      columns: [
        {
          header: 'Age',
          accessorKey: 'age',
        },
        {
          header: 'Activity',
          columns: [
  
            {
              header: 'Visits',
              accessorKey: 'visits',
            },
            {
              header: 'Status',
              accessorKey: 'status',
            },
            {
              header: 'Profile Progress',
              accessorKey: 'progress',
            },
          ]
        }
      ]
    }
  ]
  // const columns = [
  //   {
  //     header: 'Route',
  //     accessorKey: 'route',
  //   },
  //   {
  //     header: 'Time Period',
  //     columns: [
  //       {
  //         header: 'Start',
  //       accessorKey: 'time1'},
  //       {
  //         header: 'Finish',
  //       accessorKey: 'time2'}

  //     ]
  //   },
  //   {
  //     header: 'Duration',
  //     accessorFn: (row:any) => row.time2 - row.time1,
  //   },
  //   {
  //     header: 'Main Engine 1',
  //     columns: [
  //       {
  //         header: 'Running Hours',
  //         accessorKey: 'rhme1',
  //       },
  //       {
  //         header: 'RPM',
  //         accessorKey: 'rpmme1',
  //       },
  //       {
  //         header: 'Fuel Oil Consumption',
  //         accessorKey: 'fucme1',
  //       }
  //     ]
  //   }
  // ]
  const table = useReactTable({data, columns, getCoreRowModel: getCoreRowModel()})
  return (
    <div>
      <TopBar1></TopBar1>
    <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />
      
    </div>
    
<div className='relative overflow-x-auto mt-5'>
<table className='styled-table text-sm text-center'>
  <thead>
  <tr>
    <th rowSpan={2}>Route</th>
    <th colSpan={2} >Time Period</th>
    <th rowSpan={2}>Duration</th>
    <th colSpan={3} >Main Engine 1</th>
    <th colSpan={3} >Main Engine 2</th>
    <th colSpan={3}>Total FOC ME</th>
    <th colSpan={3} >Auxiliary Engine 1</th>
    <th colSpan={3} >Auxiliary Engine 2</th>
    <th colSpan={3} >Auxiliary Engine 3</th>
    <th colSpan={3} >Auxiliary Engine 4</th>
    <th colSpan={3}>Total FOC AE</th>
    <th colSpan={2}>Boiler</th>
    <th rowSpan={2}>Fuel Oil Correction</th>
    <th colSpan={3}>Total Correction</th>
  </tr>
  <tr>
    <th >Start</th>
    <th >Finish</th>
    <th>Running Hours</th>
    <th>RPM</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>RPM</th>
    <th>Fuel Oil Consumption</th>
    <th>MDO</th>
    <th>HSD</th>
    <th>LSFO</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>Running Hours</th>
    <th>Load (kW)</th>
    <th>Fuel Oil Consumption</th>
    <th>MDO</th>
    <th>HSD</th>
    <th>LSFO</th>
    <th>Running Hours</th>
    <th>Fuel Oil Consumption</th>
    <th>MDO</th>
    <th>HSD</th>
    <th>LSFO</th>
  </tr>
  </thead>
  <tbody>
  { data.map((item:any, index) => (
    inputs.vessel_name === item.vessel_name && inputs.voyage_code === item.voyage_code && 
              <tr key={index}>
                <td>{item.route}</td>
                <td>{item.time1}</td>
                <td>{item.time2}</td>
                <td>{item.time2-item.time1}</td>
                <td>{item.rhme1}</td>
                <td>{item.rpmme1}</td>
                <td>{item.fucme1}</td>
                <td>{item.rhme2}</td>
                <td>{item.rpmme2}</td>
                <td>{item.fucme2}</td>
                <td>{Number(item.typeme1 === "MDO" ? item.fucme1 : 0)+Number(item.typeme2 === "MDO" ? item.fucme2 : 0)}</td>
               
                <td>{Number(item.typeme1 === "HSD" ? item.fucme1 : 0)+Number(item.typeme2 === "HSD" ? item.fucme2 : 0)}</td>
                <td>{Number(item.typeme1 === "LSFO" ? item.fucme1 : 0)+Number(item.typeme2 === "LSFO" ? item.fucme2 : 0)}</td>
                <td>{item.rhae1}</td>
                <td>{item.loadae1}</td>
                <td>{item.fucae1}</td>
                <td>{item.rhae2}</td>
                <td>{item.loadae2}</td>
                <td>{item.fucae2}</td>
                <td>{item.rhae3}</td>
                <td>{item.loadae3}</td>
                <td>{item.fucae3}</td>
                <td>{item.rhae4}</td>
                <td>{item.loadae4}</td>
                <td>{item.fucae4}</td>
                <td>{Number(item.typeae1 === "MDO" ? item.fucae1 : 0)+Number(item.typeae2 === "MDO" ? item.fucae2 : 0)+Number(item.typeae3 === "MDO" ? item.fucae3 : 0)+Number(item.typeae4 === "MDO" ? item.fucae4 : 0)}</td>
                <td>{Number(item.typeae1 === "HSD" ? item.fucae1 : 0)+Number(item.typeae2 === "HSD" ? item.fucae2 : 0)+Number(item.typeae3 === "HSD" ? item.fucae3 : 0)+Number(item.typeae4 === "HSD" ? item.fucae4 : 0)}</td>
                <td>{Number(item.typeae1 === "LSFO" ? item.fucae1 : 0)+Number(item.typeae2 === "LSFO" ? item.fucae2 : 0)+Number(item.typeae3 === "LSFO" ? item.fucae3 : 0)+Number(item.typeae4 === "LSFO" ? item.fucae4 : 0)}</td>
                <td>{item.rhboiler}</td>
                <td>{item.fucboiler}</td>
                <td>{Number(item.correction1)+Number(item.correction2)}</td>
                <td>{Number(item.correction_type1 === "MDO" ? item.correction1 : 0)+Number(item.correction_type2 === "MDO" ? item.correction2 : 0)}</td>
               
                <td>{Number(item.correction_type1 === "HSD" ? item.correction1 : 0)+Number(item.correction_type2 === "HSD" ? item.correction2 : 0)}</td>
                <td>{Number(item.correction_type1 === "LSFO" ? item.correction1 : 0)+Number(item.correction_type2 === "LSFO" ? item.correction2 : 0)}</td>
              </tr>
            ))}

  </tbody>
  
</table>
</div>



    </div>
  )
}

export default DashboardEngineer