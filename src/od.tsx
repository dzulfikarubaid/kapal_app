import React from 'react'
import { BigButton, TopBar2 } from './template_element'

const Od = () => {
  return (
    <div>
    <TopBar2></TopBar2>
    <div className='flex flex-row gap-10 justify-center h-screen items-center'>
    <BigButton href="/od-oh" >Operational Historical Data</BigButton>
    
    <BigButton href="/od-nr" >Noon Report Recap</BigButton>
    <BigButton href="/od-pd">Plotting Data</BigButton>


    </div>
    </div>
  )
}

export default Od