import React from 'react'
import { BigButton, TopBar2 } from './template_element'

const Kapten = () => {
  return (
    <div className=' w-full'>
    <TopBar2></TopBar2>
    <div className='flex h-screen flex-row gap-4 justify-center items-center'>
    <BigButton href="/input_masinis">Input</BigButton>
    <BigButton href="/dashboard_masinis">Dashboard</BigButton>
    </div>
    </div>
  )
}

export default Kapten