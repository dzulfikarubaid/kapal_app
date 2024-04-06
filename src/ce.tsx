import React from 'react'
import { BigButton, TopBar2 } from './template_element'

const Ce = () => {
  return (
    <div className=' w-full'>
    <TopBar2></TopBar2>
    <div className='flex h-screen flex-row gap-4 justify-center items-center'>
    <BigButton href="/ce-nr">Noon Report Data</BigButton>
    <BigButton href="/ce-dr">Data Recap</BigButton>
    </div>
    </div>
  )
}

export default Ce