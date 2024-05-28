import React from 'react'
import { BigButton, TopBar1, TopBar2, TopBar3 } from './template_element'

function Fs() {
  return (
    <div>
    <TopBar2></TopBar2>
    <div className='flex flex-row gap-10 justify-center h-screen items-center'>
    <BigButton href="/fs-fpr" >Fuel Procurement Request Form</BigButton>


    </div>
    </div>
  )
}

export default Fs