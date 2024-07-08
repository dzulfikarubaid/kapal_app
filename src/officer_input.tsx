import React from 'react'
import { TopBar1, BigButton } from './template_element'

const OfficerInput = () => {
  return (
    <div>
    <TopBar1></TopBar1>
    <div className='flex flex-row h-screen justify-center items-center gap-5'>
    <BigButton href="/officer-logbook">Log Book Data</BigButton>
    <BigButton href="/officer-nr">Noon Report Data</BigButton>
    
    <BigButton href="/officer-dr">Departure Report Data</BigButton>
    
    </div>
    

    </div>
  )
}

export default OfficerInput