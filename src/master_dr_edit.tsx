import React, { useEffect } from 'react'
import { DefaultButton, DefaultInput2, TopBar1 } from './template_element'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const MasterDrEdit = () => {
    const { id } = useParams()
    const [dataLogs, setDataLogs] = React.useState<any>([{}])
    const [dataDrs, setDataDrs] = React.useState<any>([{}])
    const [dataNrs, setDataNrs] = React.useState<any>([])
    const idx = Number(id)
    useEffect(() => {
        console.log(id)

        axios.get("http://sezero.pythonanywhere.com/officer-logs/")
            .then((response: any) => {
                console.log(response.data)
                const databyid = response.data.filter((item: any) => item.id === idx)
                setDataLogs(databyid)
                console.log(databyid)
            })
            .catch((error: any) => {
                console.log(error)
            })
        axios.get("http://sezero.pythonanywhere.com/officer-drs/")
            .then((response: any) => {
                console.log(response.data)
                const databyid = response.data.filter((item: any) => item.id === idx)
                setDataDrs(databyid)
            })
            .catch((error: any) => {
                console.log(error)
            })
        axios.get("http://sezero.pythonanywhere.com/officer-nrs/")
            .then((response: any) => {
                console.log(response.data)
                const databyid = response.data.filter((item: any) => item.id === idx)
                setDataNrs(databyid)
            })
            .catch((error: any) => {
                console.log(error)
            })
    }, [])
    const [route, setRoute] = React.useState<any>(" ");
const [speed, setSpeed] = React.useState<any>(" ");
const [distance, setDistance] = React.useState<any>(" ");
const [actualDistance, setActualDistance] = React.useState<any>(" ");
const [trim, setTrim] = React.useState<any>(" ");
const [displacement, setDisplacement] = React.useState<any>(" ");
const [reeferContainer, setReeferContainer] = React.useState<any>(" ");
const [timeDeparture, setTimeDeparture] = React.useState<any>(" ");
const [timeArrival, setTimeArrival] = React.useState<any>(" ");
const [seaHour, setSeaHour] = React.useState<any>(" ");
const [portHour, setPortHour] = React.useState<any>(" ");
const [maneuveringHour, setManeuveringHour] = React.useState<any>(" ");
const [windDirect, setWindDirect] = React.useState<any>(" ");
const [windForce, setWindForce] = React.useState<any>(" ");
const [cloudiness, setCloudiness] = React.useState<any>(" ");
const [weatherCondition, setWeatherCondition] = React.useState<any>(" ");
const [seaCondition, setSeaCondition] = React.useState<any>(" ");
const [relativeCurrent, setRelativeCurrent] = React.useState<any>(" ");


function act_distance(lat1:any, lat2:any, long1:any, long2:any){
            return (2 * Math.sin(Math.sqrt(Math.sin(((lat1-lat2)/2)**2) + Math.sin(((long2-long1)/2)**2) * Math.cos(lat1) * Math.cos(lat2))))
        }
    return (
        <div>
            <TopBar1></TopBar1>
            {
                dataLogs.length > 0 && dataNrs.length > 0 && dataDrs.length > 0 &&
                    <div className='grid grid-cols-2 gap-6'>
                        <DefaultInput2 label="Route" defaultValue={dataLogs[0].route} onChange={(e: any) => setRoute(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Speed (kn)" defaultValue={dataNrs[0].speed} onChange={(e: any) => setSpeed(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Distance (Nm)" defaultValue={dataNrs[0].distance} onChange={(e: any) => setDistance(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Actual Distance (Nm)" defaultValue={act_distance(dataLogs[0].lat1, dataLogs[0].lat2, dataLogs[0].long1, dataLogs[0].long2)} onChange={(e: any) => setActualDistance(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Trim (m)" defaultValue={dataDrs[0].trim} onChange={(e: any) => setTrim(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Displacement (Ton)" defaultValue={dataDrs[0].displacement} onChange={(e: any) => setDisplacement(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Reefer Container" defaultValue={dataDrs[0].rc} onChange={(e: any) => setReeferContainer(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Time Departure" defaultValue={dataDrs[0].td} onChange={(e: any) => setTimeDeparture(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Time Arrival" defaultValue={dataLogs[0].time2} onChange={(e: any) => setTimeArrival(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Sea Hour" defaultValue={(dataLogs[0].time2 != null && dataLogs[0].time1 != null) ? dataLogs[0].time2 - dataLogs[0].time1 : ""} onChange={(e: any) => setSeaHour(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Port Hour" defaultValue={dataLogs[0].portH} onChange={(e: any) => setPortHour(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Maneuvering Hour" defaultValue={dataLogs[0].manH} onChange={(e: any) => setManeuveringHour(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Wind Direct" defaultValue={dataLogs[0].direct} onChange={(e: any) => setWindDirect(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Wind Force" defaultValue={dataLogs[0].force} onChange={(e: any) => setWindForce(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Cloudness" defaultValue={dataLogs[0].cloud} onChange={(e: any) => setCloudiness(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Weather Condition" defaultValue={dataLogs[0].wc} onChange={(e: any) => setWeatherCondition(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Sea Condition" defaultValue={dataLogs[0].sc} onChange={(e: any) => setSeaCondition(e.target.value)}></DefaultInput2>
                        <DefaultInput2 label="Relative Current" defaultValue={dataLogs[0].rcd} onChange={(e: any) => setRelativeCurrent(e.target.value)}></DefaultInput2>

                    </div>

                
            }
<div className='mt-6'>
            <DefaultButton text="Save" onclick={() =>{}}></DefaultButton>

</div>        </div>
    )
}

export default MasterDrEdit