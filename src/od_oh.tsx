import React, { useEffect, useState } from 'react'
import { DefaultInput, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios';
import { BiFilter, BiX } from 'react-icons/bi';

const OdOh = () => {
  const [inputs, setInputs] = useState({

    vessel_name: "",
    period1: "",
    period2: ""
  });
  const handleInputChange = (fieldName: any, value: string) => {
    setInputs((prevState: any) => ({
      ...prevState,
      [fieldName]: value
    }));
  }
  const [dataLogs, setDataLogs] = React.useState<any>([{}])
  const [dataDrs, setDataDrs] = React.useState<any>([{}])
  const [dataNrs, setDataNrs] = React.useState<any>([])
  const [dataNr, setDataNr] = React.useState<any>([])
  const [dataEngine, setDataEngine] = React.useState<any>([])
  useEffect(() => {
    axios.get("http://sezero.pythonanywhere.com/officer-logs/")
      .then((response: any) => {
        console.log(response.data)
        setDataLogs(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
    axios.get("http://sezero.pythonanywhere.com/officer-drs/")
      .then((response: any) => {
        console.log(response.data)
        setDataDrs(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
    axios.get("http://sezero.pythonanywhere.com/officer-nrs/")
      .then((response: any) => {
        console.log(response.data)
        setDataNrs(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
    axios.get("http://sezero.pythonanywhere.com/engineer-dashboard", {
      headers: {

      }
    })
      .then((response: any) => {
        console.log(response.data)
        setDataEngine(response.data)
      })
      .catch((error: any) => {
        console.log(error)
      })
    axios.get('http://sezero.pythonanywhere.com/nr/')
      .then((response) => {
        console.log(response.data)
        setDataNr(response.data)
      }

      )
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const [filter, setFilter] = useState(false)
  const [status, setStatus] = useState("")
  const [wdnf, setWdnf] = useState(false)
  const [ss, setSs] = useState(false)
  const [me, setMe] = useState(false)
  const [ae, setAe] = useState(false)
  const [boiler, setBoiler] = useState(false)
  const [foc, setFoc] = useState(false)
  const [speed1, setSpeed1] = useState(0)
  const [speed2, setSpeed2] = useState(0)
  const [distance1, setDistance1] = useState(0)
  const [distance2, setDistance2] = useState(0)
  const [displacement1, setDisplacement1] = useState(0)
  const [displacement2, setDisplacement2] = useState(0)
const filteredData = dataLogs.filter((logItem: any, index: any) => {
    const nrItem = dataNrs[index];
    const drItem = dataDrs[index];
    const engineItem = dataEngine[index];
    const item = dataNr[index];

    const minSpeedCondition = speed1 === 0 || nrItem.speed >= Number(speed1);
    const maxSpeedCondition = speed2 === 0 || nrItem.speed <= Number(speed2);
    const minDistanceCondition = distance1 === 0 || nrItem.distance >= Number(distance1);
    const maxDistanceCondition = distance2 === 0 || nrItem.distance <= Number(distance2);
    const minDisplacementCondition = displacement1 === 0 || drItem.displacement >= Number(displacement1);
    const maxDisplacementCondition = displacement2 === 0 || drItem.displacement <= Number(displacement2);
    const routeParts = logItem?.route?.split('-') || [] // Split the route into parts
    const isSameRoute = routeParts.length === 2 && routeParts[0] === routeParts[1]; // Check if the start and end points are the same

    const routeCondition = status === "port" 
        ? isSameRoute 
        : status === "sea" 
            ? !isSameRoute 
            : true;

    return (
        inputs?.vessel_name === drItem?.vessel_name &&
        drItem.date_dr >= inputs.period1 &&
        drItem.date_dr <= inputs.period2 &&
        minSpeedCondition &&
        maxSpeedCondition &&
        minDistanceCondition &&
        maxDistanceCondition &&
        minDisplacementCondition &&
        maxDisplacementCondition &&
        routeCondition
    );
});


  return (
    <div><TopBar1></TopBar1>
      <h1 className='text-2xl text-center mb-6 font-bold'>Operational Historical Data</h1>
      <div className='flex flex-row gap-10'>
        <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

        <div className='flex flex-col gap-2'>
          <h1>Period</h1>
          <div className='flex flex-row gap-3 items-center'>
            <InputNoLabel type="month" value={inputs.period1} onChange={(e: any) => handleInputChange("period1", e.target.value)} />
            <h1>to</h1>
            <InputNoLabel type="month" value={inputs.period2} onChange={(e: any) => handleInputChange("period2", e.target.value)} /></div>
        </div>

      </div>
      <div className='my-6'>
        <button onClick={() => setFilter(!filter)} className={`flex flex-row gap-2 justify-center items-center rounded-xl p-2 py-1 mb-4 border-[1px] ${filter ? "border-indigo-600" : ""}`}>
          <h1>Filter</h1>
          {!filter ? <BiFilter size={20}></BiFilter> : <BiX size={20}></BiX>}</button>

        {
          filter &&
          <div>
            <div className='flex flex-col gap-2'>
              <h1>Status</h1>
              <select value={status} onChange={(e) => { setStatus(e.target.value) }} id={`status`} name={`status`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[410px]  px-2 py-1 ">
                <option defaultValue="" disabled value={""}> Type</option>
                <option value="sea">Sea</option>
                <option value="port">Port</option>

              </select>
              <h1>Speed (Knot)</h1>
              <div className='flex flex-row gap-2'><InputNoLabel value={speed1} onChange={(e:any)=>setSpeed1(e.target.value)} ></InputNoLabel> - <InputNoLabel value={speed2} onChange={(e:any)=>setSpeed2(e.target.value)}></InputNoLabel></div>
              <h1>Distance (Nm)</h1>
              <div className='flex flex-row gap-2'><InputNoLabel value={distance1} onChange={(e:any)=>setDistance1(e.target.value)}></InputNoLabel> - <InputNoLabel value={distance2} onChange={(e:any)=>setDistance2(e.target.value)}></InputNoLabel>
              </div>
              <h1>Displacement (Ton)</h1>
              <div className='flex flex-row gap-2'><InputNoLabel value={displacement1} onChange={(e:any)=>setDisplacement1(e.target.value)}></InputNoLabel> - <InputNoLabel value={displacement2} onChange={(e:any)=>setDisplacement2(e.target.value)}></InputNoLabel></div>

            </div>
            <div className='flex flex-col gap-2 justify-center items-start mt-4'>
              <div className='flex flex-row gap-2'>
                <input type="checkbox" checked={wdnf} onChange={(e: any) => setWdnf(e.target.checked)} name="wdnf" id="" />
                <label htmlFor="wdnf"> Wind Direct & Force</label>
              </div>
              <div className='flex flex-row gap-2'>
                <input checked={ss} onChange={e => setSs(e.target.checked)} type="checkbox" name="ss" id="" />
                <label htmlFor="ss"> Sea State</label>
              </div>
              <div className='flex flex-row gap-2' >
                <input checked={me} onChange={e => setMe(e.target.checked)} type="checkbox" name="me" id="" />
                <label htmlFor="me"> Main Engine</label>
              </div>
              <div className='flex flex-row gap-2'>
                <input checked={ae} onChange={e => setAe(e.target.checked)} type="checkbox" name="ae" id="" />
                <label htmlFor="ae"> Auxiliary Engine</label>
              </div>
              <div className='flex flex-row gap-2'>
                <input type="checkbox" name="boiler" checked={boiler} onChange={() => setBoiler(!boiler)} id="" />
                <label htmlFor="boiler"> Boiler</label>
              </div>
              <div className='flex flex-row gap-2'>
                <input checked={foc} onChange={() => setFoc(!foc)} type="checkbox" name="foc" id="" />
                <label htmlFor="foc"> Total FOC</label>
              </div>

            </div></div>
        }




      </div>
      <div className='relative overflow-x-auto mt-5'>
        {
          !filter ?
            <table className='styled-table text-sm text-center '>
              <thead>
                <tr>
                  <th rowSpan={2}>Route</th>
                  <th rowSpan={2} >Speed (kn)</th>
                  <th rowSpan={2}>Distance (Nm)</th>
                  <th rowSpan={2}>Actual Distance (Nm)</th>
                  <th rowSpan={2}>Trim (m)</th>
                  <th rowSpan={2}>Displacement (Ton)</th>
                  <th rowSpan={2}>Reefer Container</th>
                  <th rowSpan={2}>Time Departure</th>
                  <th rowSpan={2}>Time Arrival</th>
                  <th rowSpan={2}>Sea Hour</th>
                  <th rowSpan={2}>Port Hour</th>
                  <th rowSpan={2}>Manuvering Hour</th>
                  <th rowSpan={2}>Wind Direct</th>
                  <th rowSpan={2}>Wind Force</th>
                  <th rowSpan={2}>Cloudness</th>
                  <th rowSpan={2}>Weather Condition</th>
                  <th rowSpan={2}>Sea Condition</th>
                  <th rowSpan={2}>Relative Current</th>
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
                  <th colSpan={3} >Main Engine (liter)</th>
                  <th colSpan={3} >Auxiliary Engine (liter)</th>
                  <th colSpan={3}>Boiler (liter)</th>
                  <th colSpan={3}>Fuel Oil Consumption (liter)</th>
                  <th colSpan={3} >Previous Remain (liter)</th>
                  <th colSpan={3} >Remain (liter)</th>
                </tr>
                <tr>

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

                {
                  dataLogs.length > 0 && dataNrs.length > 0 && dataDrs.length > 0 && dataEngine.length > 0 && dataNr.length > 0 &&
                  dataLogs.map((logItem: any, index: number) => {
                    const nrItem = dataNrs[index];
                    const drItem = dataDrs[index];
                    const engineItem = dataEngine[index];
                    const item = dataNr[index];
                    function act_distance(lat1: any, lat2: any, long1: any, long2: any) {
                      return (2 * Math.sin(Math.sqrt(Math.sin(((lat1 - lat2) / 2) ** 2) + Math.sin(((long2 - long1) / 2) ** 2) * Math.cos(lat1) * Math.cos(lat2))))
                    }
        
                    if (inputs?.vessel_name === drItem?.vessel_name && drItem.date_dr >= inputs.period1 && drItem.date_dr <= inputs.period2) {
                      return (

                        <tr key={index}>
                          <td>{logItem.route}</td>
                          <td>{nrItem.speed}</td>
                          <td>{nrItem.distance}</td>
                          <td>{act_distance(logItem.lat1, logItem.lat2, logItem.long1, logItem.long2)}</td>
                          <td>{drItem.trim}</td>
                          <td>{drItem.displacement}</td>
                          <td>{drItem.rc}</td>
                          <td>{drItem.td}</td>
                          <td>{logItem.time2}</td>
                          <td>{(logItem.time2 != null && logItem.time1 != null) ? logItem.time2 - logItem.time1 : ""}</td>
                          <td>{logItem.ph}</td>
                          <td>{logItem.mh}</td>
                          <td>{logItem.direct}</td>
                          <td>{logItem.force}</td>
                          <td>{logItem.cloud}</td>
                          <td>{logItem.wc}</td>
                          <td>{logItem.sc}</td>
                          <td>{logItem.rcd}</td>
                          <td>{engineItem?.rhme1}</td>
                          <td>{engineItem?.rpmme1}</td>
                          <td>{engineItem?.fucme1}</td>
                          <td>{engineItem?.rhme2}</td>
                          <td>{engineItem?.rpmme2}</td>
                          <td>{engineItem?.fucme2}</td>
                          <td>{Number(engineItem?.typeme1 === "MDO" ? engineItem?.fucme1 : 0) + Number(engineItem?.typeme2 === "MDO" ? engineItem?.fucme2 : 0)}</td>

                          <td>{Number(engineItem?.typeme1 === "HSD" ? engineItem?.fucme1 : 0) + Number(engineItem?.typeme2 === "HSD" ? engineItem?.fucme2 : 0)}</td>
                          <td>{Number(engineItem?.typeme1 === "LSFO" ? engineItem?.fucme1 : 0) + Number(engineItem?.typeme2 === "LSFO" ? engineItem?.fucme2 : 0)}</td>
                          <td>{engineItem?.rhae1}</td>
                          <td>{engineItem?.loadae1}</td>
                          <td>{engineItem?.fucae1}</td>
                          <td>{engineItem?.rhae2}</td>
                          <td>{engineItem?.loadae2}</td>
                          <td>{engineItem?.fucae2}</td>
                          <td>{engineItem?.rhae3}</td>
                          <td>{engineItem?.loadae3}</td>
                          <td>{engineItem?.fucae3}</td>
                          <td>{engineItem?.rhae4}</td>
                          <td>{engineItem?.loadae4}</td>
                          <td>{engineItem?.fucae4}</td>
                          <td>{Number(engineItem?.typeae1 === "MDO" ? engineItem?.fucae1 : 0) + Number(engineItem?.typeae2 === "MDO" ? engineItem?.fucae2 : 0) + Number(engineItem?.typeae3 === "MDO" ? engineItem?.fucae3 : 0) + Number(engineItem?.typeae4 === "MDO" ? engineItem?.fucae4 : 0)}</td>
                          <td>{Number(engineItem?.typeae1 === "HSD" ? engineItem?.fucae1 : 0) + Number(engineItem?.typeae2 === "HSD" ? engineItem?.fucae2 : 0) + Number(engineItem?.typeae3 === "HSD" ? engineItem?.fucae3 : 0) + Number(engineItem?.typeae4 === "HSD" ? engineItem?.fucae4 : 0)}</td>
                          <td>{Number(engineItem?.typeae1 === "LSFO" ? engineItem?.fucae1 : 0) + Number(engineItem?.typeae2 === "LSFO" ? engineItem?.fucae2 : 0) + Number(engineItem?.typeae3 === "LSFO" ? engineItem?.fucae3 : 0) + Number(engineItem?.typeae4 === "LSFO" ? engineItem?.fucae4 : 0)}</td>
                          <td>{engineItem?.rhboiler}</td>
                          <td>{engineItem?.fucboiler}</td>
                          <td>{Number(engineItem?.correction1) + Number(engineItem?.correction2)}</td>
                          <td>{Number(engineItem?.correction_type1 === "MDO" ? engineItem?.correction1 : 0) + Number(engineItem?.correction_type2 === "MDO" ? engineItem?.correction2 : 0)}</td>

                          <td>{Number(engineItem?.correction_type1 === "HSD" ? engineItem?.correction1 : 0) + Number(engineItem?.correction_type2 === "HSD" ? engineItem?.correction2 : 0)}</td>
                          <td>{Number(engineItem?.correction_type1 === "LSFO" ? engineItem?.correction1 : 0) + Number(engineItem?.correction_type2 === "LSFO" ? engineItem?.correction2 : 0)}</td>


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
                      );
                    }
                  })
                }


              </tbody>
            </table>
            :
            <table className='styled-table text-sm text-center '>
              <thead>
                <tr>
                  <th rowSpan={2}>Route</th>
                  <th rowSpan={2} >Speed (kn)</th>
                  <th rowSpan={2}>Distance (Nm)</th>
                  <th rowSpan={2}>Actual Distance (Nm)</th>
                  <th rowSpan={2}>Trim (m)</th>
                  <th rowSpan={2}>Displacement (Ton)</th>
                  <th rowSpan={2}>Reefer Container</th>
                  <th rowSpan={2}>Time Departure</th>
                  <th rowSpan={2}>Time Arrival</th>
                  <th rowSpan={2}>Sea Hour</th>
                  <th rowSpan={2}>Port Hour</th>
                  <th rowSpan={2}>Manuvering Hour</th>
                  {
                    wdnf &&
                    <>
                      <th rowSpan={2}>Wind Direct</th>
                      <th rowSpan={2}>Wind Force</th>
                    </>

                  }
                  {
                    ss &&
                    <>
                      <th rowSpan={2}>Cloudness</th>
                      <th rowSpan={2}>Weather Condition</th>
                      <th rowSpan={2}>Sea Condition</th>
                      <th rowSpan={2}>Relative Current Direction</th>
                    </>
                  }
                  {
                    me &&
                    <>
                      <th colSpan={3} >Main Engine 1</th>
                      <th colSpan={3} >Main Engine 2</th>

                    </>
                  }
                  {
                    foc &&
                    <th colSpan={3}>Total FOC ME</th>
                  }
                  {
                    ae &&
                    <>
                      <th colSpan={3} >Auxiliary Engine 1</th>
                      <th colSpan={3} >Auxiliary Engine 2</th>
                      <th colSpan={3} >Auxiliary Engine 3</th>
                      <th colSpan={3} >Auxiliary Engine 4</th>

                    </>
                  }
                  {
                    foc &&
                    <th colSpan={3}>Total FOC AE</th>
                  }
                  {
                    boiler &&
                    <th colSpan={2}>Boiler</th>
                  }
                  <th rowSpan={2}>Fuel Oil Correction</th>
                  <th colSpan={3}>Total Correction</th>
                  <th colSpan={3} >Main Engine (liter)</th>
                  <th colSpan={3} >Auxiliary Engine (liter)</th>
                  <th colSpan={3}>Boiler (liter)</th>
                  <th colSpan={3}>Fuel Oil Consumption (liter)</th>
                  <th colSpan={3} >Previous Remain (liter)</th>
                  <th colSpan={3} >Remain (liter)</th>
                </tr>
                <tr>

                  {
                    me &&
                    <>
                      <th>Running Hours</th>
                      <th>RPM</th>
                      <th>Fuel Oil Consumption</th>
                      <th>Running Hours</th>
                      <th>RPM</th>
                      <th>Fuel Oil Consumption</th>
                    </>
                  }
                  {
                    foc &&
                    <>
                      <th>MDO</th>
                      <th>HSD</th>
                      <th>LSFO</th>
                    </>
                  }
                  {
                    ae &&
                    <>
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
                    </>
                  }
                  {
                    foc &&
                    <>
                      <th>MDO</th>
                      <th>HSD</th>
                      <th>LSFO</th>
                    </>
                  }
                  {
                    boiler &&
                    <>
                      <th>Running Hours</th>
                      <th>Fuel Oil Consumption</th>
                    </>
                  }


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

                  <th>MDO</th>
                  <th>HSD</th>
                  <th>LSFO</th>
                </tr>
              </thead>
              <tbody>

                {
                  dataLogs.length > 0 && dataNrs.length > 0 && dataDrs.length > 0 && dataEngine.length > 0 && dataNr.length > 0 &&
                  filteredData.map((logItem: any, index: number) => {
                    const nrItem = dataNrs[index];
                    const drItem = dataDrs[index];
                    const engineItem = dataEngine[index];
                    const item = dataNr[index];
                    function act_distance(lat1: any, lat2: any, long1: any, long2: any) {
                      return (2 * Math.sin(Math.sqrt(Math.sin(((lat1 - lat2) / 2) ** 2) + Math.sin(((long2 - long1) / 2) ** 2) * Math.cos(lat1) * Math.cos(lat2))))
                    }

                    if (
      inputs.vessel_name === drItem.vessel_name && drItem.date_dr >= inputs.period1 && drItem.date_dr <= inputs.period2 
    )  {
                      return (

                        <tr key={index}>
                          <td>{logItem.route}</td>
                          <td>{nrItem.speed}</td>
                          <td>{nrItem.distance}</td>
                          <td>{act_distance(logItem.lat1, logItem.lat2, logItem.long1, logItem.long2)}</td>
                          <td>{drItem.trim}</td>
                          <td>{drItem.displacement}</td>
                          <td>{drItem.rc}</td>
                          <td>{drItem.td}</td>
                          <td>{logItem.time2}</td>
                          <td>{(logItem.time2 != null && logItem.time1 != null) ? logItem.time2 - logItem.time1 : ""}</td>
                          <td>{logItem.ph}</td>
                          <td>{logItem.mh}</td>
                          {
                            wdnf &&
                            <>
                              <td>{logItem.direct}</td>
                              <td>{logItem.force}</td>
                            </>
                          }
                          {
                            ss &&
                            <>
                              <td>{logItem.cloud}</td>
                              <td>{logItem.wc}</td>
                              <td>{logItem.sc}</td>
                              <td>{logItem.rcd}</td>
                            </>
                          }
                          {
                            me &&
                            <>
                              <td>{engineItem?.rhme1}</td>
                              <td>{engineItem?.rpmme1}</td>
                              <td>{engineItem?.fucme1}</td>
                              <td>{engineItem?.rhme2}</td>
                              <td>{engineItem?.rpmme2}</td>
                              <td>{engineItem?.fucme2}</td>
                            </>
                          }
                          {
                            foc &&
                            <>
                              <td>{Number(engineItem?.typeme1 === "MDO" ? engineItem?.fucme1 : 0) + Number(engineItem?.typeme2 === "MDO" ? engineItem?.fucme2 : 0)}</td>

                              <td>{Number(engineItem?.typeme1 === "HSD" ? engineItem?.fucme1 : 0) + Number(engineItem?.typeme2 === "HSD" ? engineItem?.fucme2 : 0)}</td>
                              <td>{Number(engineItem?.typeme1 === "LSFO" ? engineItem?.fucme1 : 0) + Number(engineItem?.typeme2 === "LSFO" ? engineItem?.fucme2 : 0)}</td>
                            </>
                          }
                          {
                            ae &&
                            <>
                              <td>{engineItem?.rhae1}</td>
                              <td>{engineItem?.loadae1}</td>
                              <td>{engineItem?.fucae1}</td>
                              <td>{engineItem?.rhae2}</td>
                              <td>{engineItem?.loadae2}</td>
                              <td>{engineItem?.fucae2}</td>
                              <td>{engineItem?.rhae3}</td>
                              <td>{engineItem?.loadae3}</td>
                              <td>{engineItem?.fucae3}</td>
                              <td>{engineItem?.rhae4}</td>
                              <td>{engineItem?.loadae4}</td>
                              <td>{engineItem?.fucae4}</td>
                            </>
                          }

                          {
                            foc &&
                            <>
                              <td>{Number(engineItem?.typeae1 === "MDO" ? engineItem?.fucae1 : 0) + Number(engineItem?.typeae2 === "MDO" ? engineItem?.fucae2 : 0) + Number(engineItem?.typeae3 === "MDO" ? engineItem?.fucae3 : 0) + Number(engineItem?.typeae4 === "MDO" ? engineItem?.fucae4 : 0)}</td>
                              <td>{Number(engineItem?.typeae1 === "HSD" ? engineItem?.fucae1 : 0) + Number(engineItem?.typeae2 === "HSD" ? engineItem?.fucae2 : 0) + Number(engineItem?.typeae3 === "HSD" ? engineItem?.fucae3 : 0) + Number(engineItem?.typeae4 === "HSD" ? engineItem?.fucae4 : 0)}</td>
                              <td>{Number(engineItem?.typeae1 === "LSFO" ? engineItem?.fucae1 : 0) + Number(engineItem?.typeae2 === "LSFO" ? engineItem?.fucae2 : 0) + Number(engineItem?.typeae3 === "LSFO" ? engineItem?.fucae3 : 0) + Number(engineItem?.typeae4 === "LSFO" ? engineItem?.fucae4 : 0)}</td>
                            </>
                          }
                          {
                            boiler &&
                            <>
                              <td>{engineItem?.rhboiler}</td>
                              <td>{engineItem?.fucboiler}</td>
                            </>
                          }


                          <td>{Number(engineItem?.correction1) + Number(engineItem?.correction2)}</td>
                          <td>{Number(engineItem?.correction_type1 === "MDO" ? engineItem?.correction1 : 0) + Number(engineItem?.correction_type2 === "MDO" ? engineItem?.correction2 : 0)}</td>

                          <td>{Number(engineItem?.correction_type1 === "HSD" ? engineItem?.correction1 : 0) + Number(engineItem?.correction_type2 === "HSD" ? engineItem?.correction2 : 0)}</td>
                          <td>{Number(engineItem?.correction_type1 === "LSFO" ? engineItem?.correction1 : 0) + Number(engineItem?.correction_type2 === "LSFO" ? engineItem?.correction2 : 0)}</td>


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
                      );
                    }
                  })
                }


              </tbody>
            </table>
        }
      </div>
    </div>
  )
}

export default OdOh