import React, { useEffect, useState } from 'react'
import { DefaultButton, DefaultInput, InputNoLabel, TopBar1 } from './template_element'
import axios from 'axios'

const FsFpr = () => {
    const [vn, setVn] = useState("")
    const [vc, setVc] = useState("")
    const [route, setRoute] = useState("")
    const [data, setData] = useState<any[]>([])
    const [br1Type, setBr1Type] = useState("")
    const [br2Type, setBr2Type] = useState("")
    const [br3Type, setBr3Type] = useState("")
    const [br1Value, setBr1Value] = useState("")
    const [br2Value, setBr2Value] = useState("")
    const [br3Value, setBr3Value] = useState("")
    const [price1Value, setPrice1Value] = useState("")
    const [price2Value, setPrice2Value] = useState("")
    const [price3Value, setPrice3Value] = useState("")
    const [price1Type, setPrice1Type] = useState("")
    const [price2Type, setPrice2Type] = useState("")
    const [price3Type, setPrice3Type] = useState("")

    useEffect(() => {
        axios.get("https://sezero.pythonanywhere.com/get-fpr/")
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    const [id, setId] = useState(0)
    useEffect(() => {
        const filteredData = data.filter((item: any) => item.vessel_name === vn && item.voyage_code === vc && item.route === route)
        if (filteredData.length > 0) {
            const item = filteredData[0]
            setId(item.id)
            setBr1Type(item.br1type)
            setBr2Type(item.br2type)
            setBr3Type(item.br3type)
            setBr1Value(item.br1value)
            setBr2Value(item.br2value)
            setBr3Value(item.br3value)
        }
    }, [vn, vc, route, data])

    const handleSubmit = () => {
      if(br1Value === "" || br2Value === "" || br3Value === "" || price1Value === "" || price2Value === "" || price3Value === ""){
        alert("Please fill all fields")
        return
        }
      axios.patch(`http://sezero.pythonanywhere.com/update-fpr/${id}/`, {
        br1type: br1Type,
        br1value: br1Value,
        br2type: br2Type,
        br2value: br2Value,
        br3type: br3Type,
        br3value: br3Value,
        price1type: price1Type,
        price1value: price1Value,
        price2type: price2Type,
        price2value: price2Value,
        price3type: price3Type,
        price3value: price3Value,
        user: JSON.parse(localStorage.getItem('userData')!).id
      })
      .then((response:any)=>{
        console.log(response)
        alert("Success update data")
      })
      .catch((error:any)=>{
        console.log(error)
        const errors = error.response.data;
        console.log(errors);
      })
    }
    return (
        <div>
            <TopBar1></TopBar1>
            <div className='flex flex-col gap-4'>
                <h1 className='text-center font-bold text-xl'>Fuel Procurement Request Form</h1>
                <DefaultInput value={vn} onChange={(e: any) => setVn(e.target.value)} label="Vessel Name" type="text" ></DefaultInput>
                <DefaultInput value={vc} onChange={(e: any) => setVc(e.target.value)} label="Voyage Code" type="text" ></DefaultInput>
                <DefaultInput value={route} onChange={(e: any) => setRoute(e.target.value)} label="Route" type="text" ></DefaultInput>
                <label htmlFor={`fuel_oil_boiler`}>Bunkering Planning</label>
                <div className='flex flex-col gap-4'>
                    <div className="flex flex-row gap-3 items-center ">
                        <select value={br1Type} onChange={(e) => setBr1Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
                            <option defaultValue="" disabled value={""}>Type</option>
                            <option value="HSD">HSD</option>
                            <option value="MDO">MDO</option>
                            <option value="LSFO">LSFO</option>
                        </select>
                        <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={br1Value} onChange={(e: any) => setBr1Value(e.target.value)} />
                        <h1>Liter</h1>
                    </div>
                    <div className="flex flex-row gap-3 items-center ">
                        <select value={br2Type} onChange={(e) => setBr2Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
                            <option defaultValue="" disabled value={""}>Type</option>
                            <option value="HSD">HSD</option>
                            <option value="MDO">MDO</option>
                            <option value="LSFO">LSFO</option>
                        </select>
                        <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={br2Value} onChange={(e: any) => setBr2Value(e.target.value)} />
                        <h1>Liter</h1>
                    </div>
                    <div className="flex flex-row gap-3 items-center ">
                        <select value={br3Type} onChange={(e) => setBr3Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
                            <option defaultValue="" disabled value={""}>Type</option>
                            <option value="HSD">HSD</option>
                            <option value="MDO">MDO</option>
                            <option value="LSFO">LSFO</option>
                        </select>
                        <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={br3Value} onChange={(e: any) => setBr3Value(e.target.value)} />
                        <h1>Liter</h1>
                    </div>
                </div>
                <h1>Price</h1>
                <div className="flex flex-row gap-3 items-center ">
                    <select value={price1Type} onChange={(e) => setPrice1Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
                        <option defaultValue="" disabled value={""}>Type</option>
                        <option value="HSD">HSD</option>
                        <option value="MDO">MDO</option>
                        <option value="LSFO">LSFO</option>
                    </select>
                    <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={price1Value} onChange={(e: any) => setPrice1Value(e.target.value)} />
                    <h1>/Liter</h1>
                </div>
                <div className="flex flex-row gap-3 items-center ">
                    <select value={price2Type} onChange={(e) => setPrice2Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
                        <option defaultValue="" disabled value={""}>Type</option>
                        <option value="HSD">HSD</option>
                        <option value="MDO">MDO</option>
                        <option value="LSFO">LSFO</option>
                    </select>
                    <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={price2Value} onChange={(e: any) => setPrice2Value(e.target.value)} />
                    <h1>/Liter</h1>
                </div>
                <div className="flex flex-row gap-3 items-center ">
                    <select value={price3Type} onChange={(e) => setPrice3Type(e.target.value)} id={`fuel_oil_boiler`} name={`fuel_oil_boiler`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
                        <option defaultValue="" disabled value={""}>Type</option>
                        <option value="HSD">HSD</option>
                        <option value="MDO">MDO</option>
                        <option value="LSFO">LSFO</option>
                    </select>
                    <InputNoLabel id={`fuc_boiler`} name={`fuc_boiler`} type="text" value={price3Value} onChange={(e: any) => setPrice3Value(e.target.value)} />
                    <h1>/Liter</h1>
                </div>
                <DefaultInput value={Number(price1Value) + Number(price2Value) + Number(price3Value)} label="Total Price" type="text"></DefaultInput>
                <div className='mt-6'>
                    <DefaultButton onclick={handleSubmit} text="Submit"></DefaultButton>
                </div>
            </div>
        </div>
    )
}

export default FsFpr
