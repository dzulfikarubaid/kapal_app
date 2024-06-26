import React, { useEffect } from 'react'
import { DefaultInput, TopBar1 } from './template_element'
import axios from 'axios'
import { FaCheckSquare, FaPenSquare } from 'react-icons/fa'


const MasterDr = () => {
    const [inputs, setInputs] = React.useState({
        vessel_name: "",
        voyage_code: "",
    })
    const handleInputChange = (fieldName: any, value: string) => {
        setInputs((prevState: any) => ({
            ...prevState,
            [fieldName]: value
        }));
    }
    const [data, setData] = React.useState<any>([{}])
    
    const [dataLogs, setDataLogs] = React.useState<any>([{}])
    const [dataDrs, setDataDrs] = React.useState<any>([{}])
    const [dataNrs, setDataNrs] = React.useState<any>([])
    function Accept(id: any) {
      const databyid: any = dataLogs.filter((item: any) => item.id === id)
    axios.patch(`http://sezero.pythonanywhere.com/officer-logs/${id}/`,
        {
            user: databyid[0].user,
            accept: true,
            lat1: databyid[0].lat1,
            long1: databyid[0].long1,
            lat2: databyid[0].lat2,
            long2: databyid[0].long2,
            lat3: databyid[0].lat3,
            long3: databyid[0].long3,
            lat4: databyid[0].lat4,
            long4: databyid[0].long4,
            rcd: databyid[0].rcd,
            vessel_name: databyid[0]?.vessel_name,
            route: databyid[0].route,
            date_logbook: databyid[0].date_logbook,
            voyage_code: databyid[0].voyage_code,
            time1: databyid[0].time1,
            time2: databyid[0].time2,
            direct: databyid[0].direct,
            force: databyid[0].force,
            cloud: databyid[0].cloud,
            wc: databyid[0].wc,
            sc: databyid[0].sc,
        }
            
    )
        .then((response: any) => {
            console.log(response)
        })
        .catch((error: any) => {
            console.log(error)
        })
  }
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
    },[])
    return (
        <div>
            <TopBar1></TopBar1>
            <div className='flex flex-row gap-10'>
                <DefaultInput label="Vessel Name" type="text" value={inputs.vessel_name} onChange={(e: any) => handleInputChange("vessel_name", e.target.value)} />

                <DefaultInput label="Voyage Code" type="text" value={inputs.voyage_code} onChange={(e: any) => handleInputChange("voyage_code", e.target.value)} />

            </div>
            <div className='relative overflow-x-auto mt-5'>
                <table className='styled-table text-sm text-center '>
                    <thead>
                        <tr>
                            <th >Route</th>
                            <th >Speed (kn)</th>
                            <th>Distance (Nm)</th>
                            <th>Actual Distance (Nm)</th>
                            <th>Trim (m)</th>
                            <th>Displacement (Ton)</th>
                            <th>Reefer Container</th>
                            <th>Time Departure</th>
                            <th>Time Arrival</th>
                            <th>Sea Hour</th>
                            <th>Port Hour</th>
                            <th>Manuvering Hour</th>
                            <th>Wind Direct</th>
                            <th>Wind Force</th>
                            <th>Cloudness</th>
                            <th>Weather Condition</th>
                            <th>Sea Condition</th>
                            <th>Relative Current</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                  
                  {
                    dataLogs.length > 0 && dataNrs.length > 0 && dataDrs.length > 0 &&
    dataLogs.map((logItem: any, index: number) => {
        const nrItem = dataNrs[index];
        const drItem = dataDrs[index];
        function act_distance(lat1:any, lat2:any, long1:any, long2:any){
            return (2 * Math.sin(Math.sqrt(Math.sin(((lat1-lat2)/2)**2) + Math.sin(((long2-long1)/2)**2) * Math.cos(lat1) * Math.cos(lat2))))
        }
        if((inputs?.vessel_name === logItem?.vessel_name && inputs?.voyage_code === logItem?.voyage_code) || (inputs?.vessel_name === nrItem?.vessel_name && inputs?.voyage_code === nrItem?.voyage_code) || (inputs?.vessel_name === drItem?.vessel_name && inputs?.voyage_code === drItem?.voyage_code)){
        return (
            <tr key={index}>
                <td>{logItem.route ?? ""}</td>
                <td>{nrItem.speed ?? ""}</td>
                <td>{nrItem.distance ?? ""}</td>
                <td>{act_distance(logItem.lat1, logItem.lat2, logItem.long1, logItem.long2)}</td>
                <td>{drItem.trim ?? ""}</td>
                <td>{drItem.displacement ?? ""}</td>
                <td>{drItem.rc ?? ""}</td>
                <td>{drItem.td ?? ""}</td>
                <td>{logItem.time2 ?? ""}</td>
                <td>{(logItem.time2 != null && logItem.time1 != null) ? logItem.time2 - logItem.time1 : ""}</td>
                <td>{logItem.ph ?? ""}</td>
                <td>{logItem.mh ?? ""}</td>
                <td>{logItem.direct ?? ""}</td>
                <td>{logItem.force ?? ""}</td>
                <td>{logItem.cloud ?? ""}</td>
                <td>{logItem.wc ?? ""}</td>
                <td>{logItem.sc ?? ""}</td>
                <td>{logItem.rcd ?? ""}</td>
                 <td><a href={`master-dr/${logItem.id}`} className=''><FaPenSquare color='BLUE' size={20}></FaPenSquare></a></td>
                <td><button disabled={logItem.accept === true ? true : false} onClick={() => Accept(logItem.id)}><FaCheckSquare color={`${logItem.accept == true ? "" : 'green'}`} size={20}></FaCheckSquare></button></td>
            </tr>
        );}
    })
}

                
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MasterDr