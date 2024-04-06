import React from 'react'
import { BigButton, DefaultButton, TopBar1, TopBar2 } from './template_element'

const Officer = () => {
  return (
    <div>
    <TopBar2></TopBar2>
    <div className='flex flex-row h-screen justify-center items-center gap-5'>
    <BigButton href="/officer-logbook">Log Book Data</BigButton>
    <BigButton href="/officer-nr">Noon Report Data</BigButton>
    
    <BigButton href="/officer-dr">Departure Report Data</BigButton>
    <BigButton href="/officer-dashboard">Data Recap</BigButton>


    </div>
    </div>
  )
}

export default Officer