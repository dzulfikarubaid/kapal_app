import React from 'react'
import { BigButton, TopBar2 } from './template_element'

const Engineer = () => {
  return (
    <div className=' w-full'>
    <TopBar2></TopBar2>
    <div className='flex h-screen flex-row gap-4 justify-center items-center'>
    <BigButton href="/input-engineer">Input</BigButton>
    <BigButton href="/dashboard-engineer">Data Recap</BigButton>
    </div>
    </div>
  )
}

export default Engineer