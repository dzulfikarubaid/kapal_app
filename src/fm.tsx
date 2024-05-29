import React from 'react'
import { BigButton, TopBar2 } from './template_element'

function Fm() {

  return (
    <div>
    <TopBar2></TopBar2>
    <div className='flex h-screen flex-row gap-10 justify-center items-center'>
    <BigButton href="/fm-foc">Fuel Oil Consumption Historical Data</BigButton>
    <BigButton href="/fm-fpr" >Fuel Procurement Request Form</BigButton>
    <BigButton href="/fm-pd" >Plotting Data</BigButton>
    </div>
    </div>
  )
}

export default Fm