import React, { useEffect } from 'react'
import { DefaultInput, TopBar1 } from './template_element'
import axios from 'axios'
import { act } from 'react-dom/test-utils'

const OfficerDash = () => {
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
    const [dataLogs, setDataLogs] = React.useState<any>([{}])
    const [dataDrs, setDataDrs] = React.useState<any>([{}])
    const [dataNrs, setDataNrs] = React.useState<any>([])
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
        if((inputs.vessel_name === logItem?.vessel_name && inputs.voyage_code === logItem?.voyage_code) || (inputs.vessel_name === nrItem?.vessel_name && inputs.voyage_code === nrItem?.voyage_code) || (inputs.vessel_name === drItem?.vessel_name && inputs.voyage_code === drItem?.voyage_code)){
        return (
            <tr key={index}>
                <td>{logItem?.route }</td>
                <td>{nrItem?.speed }</td>
                <td>{nrItem?.distance }</td>
                <td>{act_distance(logItem?.lat1, logItem?.lat2, logItem?.long1, logItem?.long2)}</td>
                <td>{drItem?.trim }</td>
                <td>{drItem?.displacement }</td>
                <td>{drItem?.rc }</td>
                <td>{drItem?.td }</td>
                <td>{logItem?.time2 }</td>
                <td>{(logItem?.time2 != null && logItem?.time1 != null) ? logItem?.time2 - logItem?.time1 : ""}</td>
                <td>{logItem?.ph }</td>
                <td>{logItem?.mh }</td>
                <td>{logItem?.direct }</td>
                <td>{logItem?.force }</td>
                <td>{logItem?.cloud }</td>
                <td>{logItem?.wc }</td>
                <td>{logItem?.sc }</td>
                <td>{logItem?.rcd }</td>
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

export default OfficerDash