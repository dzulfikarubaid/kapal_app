import React from 'react'
import { getStatus } from './home'
import { TopBar1, TopBar3, TopBar4 } from './template_element'
const Confirmation = () => {
    const [loading, setLoading] = React.useState(false)
    function Onclick(){
        setLoading(true)
        getStatus().then(()=>setLoading(false))
    }
  return (
    <>
    <TopBar4></TopBar4>
    <div className='flex flex-col justify-center items-center text-center h-screen'>
    <h1>Waiting for admin confirmation</h1>
    <button onClick={Onclick}>{loading? 'Loading...': 'Refresh'}</button>
    </div>
    </>
    
  )
}

export default Confirmation