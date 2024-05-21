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
    <div className='flex flex-col justify-center gap-6 items-center text-center pt-10'>
    <img src="wait.webp" alt="" />
    <h1>Waiting for admin confirmation</h1>
    <button className='px-6 bg-indigo-500 py-1 text-white rounded-full' onClick={Onclick}>{loading? 'Loading...': 'Refresh'}</button>
    </div>
    </>
    
  )
}

export default Confirmation