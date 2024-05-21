import React, { useEffect, useState } from 'react'
import { DefaultInput, DefaultInput2, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios';
import { FaCheckSquare, FaPenSquare } from 'react-icons/fa';
import { BiFilter, BiUser, BiX } from 'react-icons/bi';

const OdNr = () => {
  const [inputs, setInputs] = useState({

    vessel_name: "",
    date1: "",
    date2: "",
  });

  const [dataDr, setDataDr] = useState<any>([])
  const [data, setData] = useState([])
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
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
   const [me, setMe] = useState(false);
  const [ae, setAe] = useState(false)
  const [boiler, setBoiler] = useState(false)
  const [foc, setFoc] = useState(false)
  const [pr, setPr] = useState(false)
  const [remain, setRemain] = useState(false)
  const [speed1, setSpeed1] = useState(0)
  const [speed2, setSpeed2] = useState(0)
  const [distance1, setDistance1] = useState(0)
  const [distance2, setDistance2] = useState(0)
  const [filter, setFilter] = useState(false)
  const filteredData = data.filter((item:any) => {
    if(filter){
    const speedData = dataDr.find((dr:any) => dr.vessel_name === item.vessel_name);
      
    const speed = speedData ? speedData.speed : 0;
    const distance = speedData ? speedData.distance : 0;

    const minSpeedCondition = speed1 === 0 || speed >= Number(speed1);
    const maxSpeedCondition = speed2 === 0 || speed <= Number(speed2);
    const minDistanceCondition = distance1 === 0 || distance >= Number(distance1);
    const maxDistanceCondition = distance2 === 0 || distance <= Number(distance2);

    return minSpeedCondition && maxSpeedCondition && minDistanceCondition && maxDistanceCondition;
    }
    return true;
  });


  return (
    <div><TopBar1></TopBar1>
    <h1 className='text-2xl text-center mb-6 font-bold'>Noon Report Recap</h1>
      <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <div className='flex flex-col gap-2'>
          <h1>Period</h1>
          <div className='flex flex-row gap-3 items-center'>
            <InputNoLabel type="month" value={inputs.date1} onChange={(e: any) => handleInputChange("date1", e.target.value)} />
            <h1>to</h1>
            <InputNoLabel type="month" value={inputs.date2} onChange={(e: any) => handleInputChange("date2", e.target.value)} /></div>
        </div>

      </div>
      <div className='my-6'>
    
          <button onClick={()=>setFilter(!filter)} className={`flex flex-row gap-2 justify-center items-center rounded-xl p-2 py-1 mb-4 border-[1px] ${filter ? "border-indigo-600":""}`}>
          <h1>Filter</h1>
           {!filter ? <BiFilter size={20}></BiFilter> : <BiX size={20}></BiX>}</button>
        {
          filter &&
         
          <div className='flex flex-col gap-2'>
          <h1>Speed (Knot)</h1>
          <div className='flex flex-row gap-2'>
          <InputNoLabel value={speed1} onChange={(e:any)=>setSpeed1(e.target.value)}></InputNoLabel> - <InputNoLabel value={speed2} onChange={(e:any)=>setSpeed2(e.target.value)}></InputNoLabel></div>
          <h1>Distance (Nm)</h1>
          <div className='flex flex-row gap-2'>
          <InputNoLabel value={distance1} onChange={(e:any)=>setDistance1(e.target.value)}></InputNoLabel> - <InputNoLabel value={distance2} onChange={(e:any)=>setDistance2(e.target.value)}></InputNoLabel>

          </div>
          <div className='flex flex-col gap-2 justify-center items-start mt-4'>
         <div className='flex flex-row gap-2' >
         <input type="checkbox" checked={me} onChange={(e)=>setMe(e.target.checked)}  name="me" id="" />
        <label htmlFor="me"> Main Engine</label>
         </div>
        <div className='flex flex-row gap-2'>
        <input type="checkbox" name="ae" id="" checked={ae} onChange={(e)=>setAe(e.target.checked)} />
        <label htmlFor="ae"> Auxiliary Engine</label>
        </div>
        <div className='flex flex-row gap-2'>
        <input type="checkbox" name="boiler" id="" checked={boiler} onChange={(e)=>setBoiler(e.target.checked)} />
        <label htmlFor="boiler"> Boiler</label>
        </div>
        <div className='flex flex-row gap-2'>
        <input type="checkbox" name="foc" id="" checked={foc} onChange={(e)=>setFoc(e.target.checked)} />
        <label htmlFor="foc"> Fuel Oil Consumption</label>
        </div>
        <div className='flex flex-row gap-2'>
        <input type="checkbox" name="pr" id="" checked={pr} onChange={(e)=>setPr(e.target.checked)} />
        <label htmlFor="pr"> Previous Remain</label>
        </div>
        <div className='flex flex-row gap-2'>
        <input type="checkbox" name="remain" id="" checked={remain} onChange={(e)=>setRemain(e.target.checked)} />
        <label htmlFor="remain"> Remain</label>
        </div>
        </div>
          

        </div>
        }
        

       

      </div>
      <div className='relative overflow-x-auto mt-5'>
        {
          !filter ? 
          <table className='styled-table text-sm text-center'>
          <thead>
            <tr>
              <th rowSpan={2}>Route</th>
              <th rowSpan={2} >Speed (kn)</th>
              <th rowSpan={2}>Distance (Nm)</th>
                <th colSpan={3} >Main Engine (liter)</th>
              
              <th colSpan={3} >Auxiliary Engine (liter)</th>
              <th colSpan={3}>Boiler (liter)</th>
              <th colSpan={3}>Fuel Oil Consumption (liter)</th>
              <th colSpan={3} >Previous Remain (liter)</th>
              <th colSpan={3} >Remain (liter)</th>
      

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
            {filteredData.map((item: any, index) => (
              inputs.vessel_name === item.vessel_name && item.accept === true && item.date >= inputs.date1 && item.date <= inputs.date2 &&
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

              </tr>
            ))}

          </tbody>

        </table>
        :
        <table className='styled-table text-sm text-center'>
          <thead>
            <tr>
              <th rowSpan={2}>Route</th>
              <th rowSpan={2} >Speed (kn)</th>
              <th rowSpan={2}>Distance (Nm)</th>
              {
                me &&
                <th colSpan={3} >Main Engine (liter)</th>
              }
              {
                ae === true &&
                <th colSpan={3} >Auxiliary Engine (liter)</th>
              }
              {
                boiler === true && <th colSpan={3}>Boiler (liter)</th>
              }
              {
                foc && <th colSpan={3}>Fuel Oil Consumption (liter)</th>
              }
              {
                pr && <th colSpan={3} >Previous Remain (liter)</th>
              }
              {
                remain && <th colSpan={3} >Remain (liter)</th>
              }

      

            </tr>
            <tr>
              {
                me === true &&
                <>
                <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
                </>
              }
              {
                ae === true &&
                <>
                <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
                </>
              }
              {
                boiler === true &&
                <>
                <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
                </>
              }
              {
                foc === true &&
                <>
                <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
                </>
              }
              {
                pr === true &&
                <>
                <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
                </>
              }
              {
                remain === true &&
                <>
                <th>MDO</th>
              <th>HSD</th>
              <th>LSFO</th>
                </>
              }
        

            </tr>
          </thead>
          <tbody>
            {filteredData.map((item: any, index) => (
              inputs.vessel_name === item.vessel_name && item.accept === true && item.date >= inputs.date1 && item.date <= inputs.date2 &&
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
                { me === true &&
                  <>
                <td>{Number(item?.me_type1 === "MDO" ? item?.me1 : 0) + Number(item?.me_type2 === "MDO" ? item?.me2 : 0) + Number(item?.me_type3 === "MDO" ? item?.me3 : 0)}</td>
                <td>{Number(item?.me_type1 === "HSD" ? item?.me1 : 0) + Number(item?.me_type2 === "HSD" ? item?.me2 : 0) + Number(item?.me_type3 === "HSD" ? item?.me3 : 0)}</td>
                <td>{Number(item?.me_type1 === "LSFO" ? item?.me1 : 0) + Number(item?.me_type2 === "LSFO" ? item?.me2 : 0) + Number(item?.me_type3 === "LSFO" ? item?.me3 : 0)}</td>
                  </>
                }
                {
                  ae === true &&
                  <>
                <td>{Number(item?.ae_type1 === "MDO" ? item?.ae1 : 0) + Number(item?.ae_type2 === "MDO" ? item?.ae2 : 0) + Number(item?.ae_type3 === "MDO" ? item?.ae3 : 0)}</td>
                <td>{Number(item?.ae_type1 === "HSD" ? item?.ae1 : 0) + Number(item?.ae_type2 === "HSD" ? item?.ae2 : 0) + Number(item?.ae_type3 === "HSD" ? item?.ae3 : 0)}</td>
                <td>{Number(item?.ae_type1 === "LSFO" ? item?.ae1 : 0) + Number(item?.ae_type2 === "LSFO" ? item?.ae2 : 0) + Number(item?.ae_type3 === "LSFO" ? item?.ae3 : 0)}</td>
                  </>
                }
                {
                  boiler === true &&
                  <>
                <td>{Number(item?.boiler_type1 === "MDO" ? item?.boiler1 : 0) + Number(item?.boiler_type2 === "MDO" ? item?.boiler2 : 0) + Number(item?.boiler_type3 === "MDO" ? item?.boiler3 : 0)}</td>
                <td>{Number(item?.boiler_type1 === "HSD" ? item?.boiler1 : 0) + Number(item?.boiler_type2 === "HSD" ? item?.boiler2 : 0) + Number(item?.boiler_type3 === "HSD" ? item?.boiler3 : 0)}</td>
                <td>{Number(item?.boiler_type1 === "LSFO" ? item?.boiler1 : 0) + Number(item?.boiler_type2 === "LSFO" ? item?.boiler2 : 0) + Number(item?.boiler_type3 === "LSFO" ? item?.boiler3 : 0)}</td>
                  </>
                }
                {
                  foc === true &&
                  <>

                <td>{Number(item?.foc_type1 === "MDO" ? item?.foc1 : 0) + Number(item?.foc_type2 === "MDO" ? item?.foc2 : 0) + Number(item?.foc_type3 === "MDO" ? item?.foc3 : 0)}</td>
                <td>{Number(item?.foc_type1 === "HSD" ? item?.foc1 : 0) + Number(item?.foc_type2 === "HSD" ? item?.foc2 : 0) + Number(item?.foc_type3 === "HSD" ? item?.foc3 : 0)}</td>
                <td>{Number(item?.foc_type1 === "LSFO" ? item?.foc1 : 0) + Number(item?.foc_type2 === "LSFO" ? item?.foc2 : 0) + Number(item?.foc_type3 === "LSFO" ? item?.foc3 : 0)}</td>
                  </>
                }
                {
                  pr === true &&
                  <>
                <td>{Number(item?.pr_type1 === "MDO" ? item?.pr1 : 0) + Number(item?.pr_type2 === "MDO" ? item?.pr2 : 0) + Number(item?.pr_type3 === "MDO" ? item?.pr3 : 0)}</td>
                <td>{Number(item?.pr_type1 === "HSD" ? item?.pr1 : 0) + Number(item?.pr_type2 === "HSD" ? item?.pr2 : 0) + Number(item?.pr_type3 === "HSD" ? item?.pr3 : 0)}</td>
                <td>{Number(item?.pr_type1 === "LSFO" ? item?.pr1 : 0) + Number(item?.pr_type2 === "LSFO" ? item?.pr2 : 0) + Number(item?.pr_type3 === "LSFO" ? item?.pr3 : 0)}</td>
                  </>
                }
                {
                  remain === true &&
                  <>
                <td>{Number(item?.remain_type1 === "MDO" ? item?.remain1 : 0) + Number(item?.remain_type2 === "MDO" ? item?.remain2 : 0) + Number(item?.remain_type3 === "MDO" ? item?.remain3 : 0)}</td>
                <td>{Number(item?.remain_type1 === "HSD" ? item?.remain1 : 0) + Number(item?.remain_type2 === "HSD" ? item?.remain2 : 0) + Number(item?.remain_type3 === "HSD" ? item?.remain3 : 0)}</td>
                <td>{Number(item?.remain_type1 === "LSFO" ? item?.remain1 : 0) + Number(item?.remain_type2 === "LSFO" ? item?.remain2 : 0) + Number(item?.remain_type3 === "LSFO" ? item?.remain3 : 0)}</td>
                  </>
                }
              </tr>
            ))}

          </tbody>

        </table>
        }
      </div>
    </div>
  )
}

export default OdNr