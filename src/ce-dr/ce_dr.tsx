import React, { useEffect, useMemo, useState } from 'react'
import { DefaultInput, TopBar1 } from '../template_element'
import axios from 'axios';
import { access } from 'original-fs';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { BiCheck, BiCheckSquare, BiCheckboxSquare, BiEdit } from 'react-icons/bi'
import { DiReact } from 'react-icons/di';
import { FaCheck, FaCheckSquare, FaEdit, FaPenSquare } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';
const CeDr = () => {
  const [isAccept, setIsAccept] = useState(false)
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
  useEffect(() => {
    axios.get("http://sezero.pythonanywhere.com/engineer-dashboard", {
      headers: {

      }
    })
      .then((response: any) => {
        console.log(response.data)
        setData(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  function Accept(id: any) {
    const databyid:any = data.filter((item: any) => item.id === id)
    setIsAccept(true)
    axios.patch(`http://sezero.pythonanywhere.com/engine-update/${id}/`, 
    {
    rhme1: databyid[0].rhme1,
    rhme2: databyid[0].rhme2,
    rpmme1: databyid[0].rpmme1,
    rpmme2: databyid[0].rpmme2,
    typeme1: databyid[0].typeme1,
    typeme2: databyid[0].typeme2,
    fucme1: databyid[0].fucme1,
    fucme2: databyid[0].fucme2,
    rhae1: databyid[0].rhae1,
    rhae2: databyid[0].rhae2,
    rhae3: databyid[0].rhae3,
    rhae4: databyid[0].rhae4,
    loadae1: databyid[0].loadae1,
    loadae2: databyid[0].loadae2,
    loadae3: databyid[0].loadae3,
    loadae4: databyid[0].loadae4,
    typeae1: databyid[0].typeae1,
    typeae2: databyid[0].typeae2,
    typeae3: databyid[0].typeae3,
    typeae4: databyid[0].typeae4,
    fucae1: databyid[0].fucae1,
    fucae2: databyid[0].fucae2,
    fucae3: databyid[0].fucae3,
    fucae4: databyid[0].fucae4,
    date: databyid[0].date,
    time1: databyid[0].time1,
    time2: databyid[0].time2,
    rhboiler: databyid[0].rhboiler,
    typeboiler: databyid[0].typeboiler,

    fucboiler: databyid[0].fucboiler,
    route: databyid[0].route,
    vessel_name: databyid[0].vessel_name,
    voyage_code: databyid[0].voyage_code,

    correction_type1: databyid[0].correction_type1,
    correction1: databyid[0].correction1,
    correction_type2: databyid[0].correction_type2,
    correction2: databyid[0].correction2,
    user: databyid[0].user,
    accept: true
})
.then(response => {
    console.log('Pembaruan berhasil:', response.data);
})
.catch(error => {
    console.error('Ada kesalahan saat melakukan pembaruan:', error);
});

  }
  return (
    <div>
      <TopBar1></TopBar1>
      <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />

      </div>
      {/* <table className=''>
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className=''>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className=''>
                {flexRender(
                  header.isPlaceholder ? null : header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className='' key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className='' key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}

            </tr>
          ))} 
        </tbody>
    </table> */}

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
              <th rowSpan={2} colSpan={2}>Action</th>
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
            {data.map((item: any, index) => (
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
                <td><a href={`ce-dr/${item.id}`}><FaPenSquare color='BLUE' size={20}></FaPenSquare></a></td>
                <td><button disabled={item.accept === true ? true : false} onClick={()=>Accept(item.id)}><FaCheckSquare color={`${item.accept == true ? "" : 'green'}`} size={20}></FaCheckSquare></button></td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>



    </div>
  )
}

export default CeDr