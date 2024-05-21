import React, { useEffect, useState } from 'react'
import { DefaultInput, DefaultInput2, TopBar1 } from './template_element'
import axios from 'axios';
import { FaCheckSquare, FaPenSquare } from 'react-icons/fa';

const MasterNr = () => {
  const [inputs, setInputs] = useState({

    vessel_name: "",
    month: "",
  });

  const [dataDr, setDataDr] = useState<any>([])
  const [data, setData] = useState([])
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  function Accept(id: any) {
    const databyid: any = data.filter((item: any) => item?.id === id)
    console.log(databyid)
    axios.patch(`http://sezero.pythonanywhere.com/nr-update/${id}/`,
      {
        vessel_name: databyid[0].vessel_name,
        voyage_code: databyid[0].voyage_code,
        date: databyid[0].date,
        me1: databyid[0].me1,
        me2: databyid[0].me2,
        me3: databyid[0].me3,
        me_type1: databyid[0].me_type1,
        me_type2: databyid[0].me_type2,
        me_type3: databyid[0].me_type3,
        ae1: databyid[0].ae1,
        ae2: databyid[0].ae2,
        ae3: databyid[0].ae3,
        ae_type1: databyid[0].ae_type1,
        ae_type2: databyid[0].ae_type2,
        ae_type3: databyid[0].ae_type3,
        boiler1: databyid[0].boiler1,
        boiler2: databyid[0].boiler2,
        boiler3: databyid[0].boiler3,
        boiler_type1: databyid[0].boiler_type1,
        boiler_type2: databyid[0].boiler_type2,
        boiler_type3: databyid[0].boiler_type3,
        foc1: databyid[0].foc1,
        foc2: databyid[0].foc2,
        foc3: databyid[0].foc3,
        foc_type1: databyid[0].foc_type1,
        foc_type2: databyid[0].foc_type2,
        foc_type3: databyid[0].foc_type3,
        pr1: databyid[0].pr1,
        pr2: databyid[0].pr2,
        pr3: databyid[0].pr3,
        pr_type1: databyid[0].pr_type1,
        pr_type2: databyid[0].pr_type2,
        pr_type3: databyid[0].pr_type3,
        remain1: databyid[0].remain1,
        remain2: databyid[0].remain2,
        remain3: databyid[0].remain3,
        remain_type1: databyid[0].remain_type1,
        remain_type2: databyid[0].remain_type2,
        remain_type3: databyid[0].remain_type3,
        accept: true,
        user: databyid[0].user,
      })
      .then(response => {
        console.log('Pembaruan berhasil:', response.data);
      })
      .catch(error => {
        console.error('Ada kesalahan saat melakukan pembaruan:', error);
      });
  }
  useEffect(() => {
    axios.get('http://sezero.pythonanywhere.com/nr/')
      .then((response) => {
        console.log(response.data)
        setData(response.data)
      }

      )
      .catch((error) => {
        console.log(error)
      })
    axios.get("http://sezero.pythonanywhere.com/officer-nrs/", {
      headers: {

      }
    })
      .then((response: any) => {
        console.log(response.data)
        setDataDr(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])
  return (
    <div><TopBar1></TopBar1>
      <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <DefaultInput2 label="Month (Number)" placeholder="ex: 2" type="text" value={inputs.month} onChange={(e: any) => handleInputChange("month", e.target.value)} />

      </div>
      <div className='relative overflow-x-auto mt-5'>
        <table className='styled-table text-sm text-center'>
          <thead>
            <tr>
              <th rowSpan={2}>Date</th>
              <th rowSpan={2} >Speed (kn)</th>
              <th rowSpan={2}>Distance (Nm)</th>
              <th colSpan={3} >Main Engine (liter)</th>
              <th colSpan={3} >Auxiliary Engine (liter)</th>
              <th colSpan={3}>Boiler (liter)</th>
              <th colSpan={3}>Fuel Oil Consumption (liter)</th>
              <th colSpan={3} >Previous Remain (liter)</th>
              <th colSpan={3} >Remain (liter)</th>
              <th colSpan={2} rowSpan={2}>Action</th>

            </tr>
            <tr>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
              <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>

            </tr>
          </thead>
          <tbody>
            {data.map((item: any, index) => (
              inputs.vessel_name === item.vessel_name && Number(inputs.month) === Number(item.date.split("-")[1]) &&
              <tr key={index}>
                <td>{item?.date}</td>
                {
                  dataDr.map((itemDr: any, indexDr: any) => (
                    inputs.vessel_name === itemDr.vessel_name &&

                    <td key={indexDr}>{itemDr?.speed}</td>


                  ))
                }
                {
                  dataDr.map((itemDr: any, indexDr: any) => (
                    inputs.vessel_name === itemDr.vessel_name &&
                    <td key={indexDr}>{itemDr?.distance}</td>
                  ))
                }
                <td>{Number(item?.me_type1 === "MDO" ? item?.me1 : 0) + Number(item?.me_type2 === "MDO" ? item?.me2 : 0) + Number(item?.me_type3 === "MDO" ? item?.me3 : 0)}</td>
                <td>{Number(item?.me_type1 === "HSD" ? item?.me1 : 0) + Number(item?.me_type2 === "HSD" ? item?.me2 : 0) + Number(item?.me_type3 === "HSD" ? item?.me3 : 0)}</td>
                <td>{Number(item?.me_type1 === "LSFO" ? item?.me1 : 0) + Number(item?.me_type2 === "LSFO" ? item?.me2 : 0) + Number(item?.me_type3 === "LSFO" ? item?.me3 : 0)}</td>
                <td>{Number(item?.ae_type1 === "MDO" ? item?.ae1 : 0) + Number(item?.ae_type2 === "MDO" ? item?.ae2 : 0) + Number(item?.ae_type3 === "MDO" ? item?.ae3 : 0)}</td>
                <td>{Number(item?.ae_type1 === "HSD" ? item?.ae1 : 0) + Number(item?.ae_type2 === "HSD" ? item?.ae2 : 0) + Number(item?.ae_type3 === "HSD" ? item?.ae3 : 0)}</td>
                <td>{Number(item?.ae_type1 === "LSFO" ? item?.ae1 : 0) + Number(item?.ae_type2 === "LSFO" ? item?.ae2 : 0) + Number(item?.ae_type3 === "LSFO" ? item?.ae3 : 0)}</td>
                <td>{Number(item?.boiler_type1 === "MDO" ? item?.boiler1 : 0) + Number(item?.boiler_type2 === "MDO" ? item?.boiler2 : 0) + Number(item?.boiler_type3 === "MDO" ? item?.boiler3 : 0)}</td>
                <td>{Number(item?.boiler_type1 === "HSD" ? item?.boiler1 : 0) + Number(item?.boiler_type2 === "HSD" ? item?.boiler2 : 0) + Number(item?.boiler_type3 === "HSD" ? item?.boiler3 : 0)}</td>
                <td>{Number(item?.boiler_type1 === "LSFO" ? item?.boiler1 : 0) + Number(item?.boiler_type2 === "LSFO" ? item?.boiler2 : 0) + Number(item?.boiler_type3 === "LSFO" ? item?.boiler3 : 0)}</td>
                <td>{Number(item?.foc_type1 === "MDO" ? item?.foc1 : 0) + Number(item?.foc_type2 === "MDO" ? item?.foc2 : 0) + Number(item?.foc_type3 === "MDO" ? item?.foc3 : 0)}</td>
                <td>{Number(item?.foc_type1 === "HSD" ? item?.foc1 : 0) + Number(item?.foc_type2 === "HSD" ? item?.foc2 : 0) + Number(item?.foc_type3 === "HSD" ? item?.foc3 : 0)}</td>
                <td>{Number(item?.foc_type1 === "LSFO" ? item?.foc1 : 0) + Number(item?.foc_type2 === "LSFO" ? item?.foc2 : 0) + Number(item?.foc_type3 === "LSFO" ? item?.foc3 : 0)}</td>
                <td>{Number(item?.pr_type1 === "MDO" ? item?.pr1 : 0) + Number(item?.pr_type2 === "MDO" ? item?.pr2 : 0) + Number(item?.pr_type3 === "MDO" ? item?.pr3 : 0)}</td>
                <td>{Number(item?.pr_type1 === "HSD" ? item?.pr1 : 0) + Number(item?.pr_type2 === "HSD" ? item?.pr2 : 0) + Number(item?.pr_type3 === "HSD" ? item?.pr3 : 0)}</td>
                <td>{Number(item?.pr_type1 === "LSFO" ? item?.pr1 : 0) + Number(item?.pr_type2 === "LSFO" ? item?.pr2 : 0) + Number(item?.pr_type3 === "LSFO" ? item?.pr3 : 0)}</td>
                <td>{Number(item?.remain_type1 === "MDO" ? item?.remain1 : 0) + Number(item?.remain_type2 === "MDO" ? item?.remain2 : 0) + Number(item?.remain_type3 === "MDO" ? item?.remain3 : 0)}</td>
                <td>{Number(item?.remain_type1 === "HSD" ? item?.remain1 : 0) + Number(item?.remain_type2 === "HSD" ? item?.remain2 : 0) + Number(item?.remain_type3 === "HSD" ? item?.remain3 : 0)}</td>
                <td>{Number(item?.remain_type1 === "LSFO" ? item?.remain1 : 0) + Number(item?.remain_type2 === "LSFO" ? item?.remain2 : 0) + Number(item?.remain_type3 === "LSFO" ? item?.remain3 : 0)}</td>
                <td><a href={`master-nr/${item?.id}`} className=''><FaPenSquare color='BLUE' size={20}></FaPenSquare></a></td>
                <td><button disabled={item?.accept === true ? true : false} onClick={() => Accept(item?.id)}><FaCheckSquare color={`${item?.accept == true ? "" : 'green'}`} size={20}></FaCheckSquare></button></td>
              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  )
}

export default MasterNr