import React from 'react'
import { BigButton, TopBar1 } from './template_element'

const InputMasinis = () => {
  return (
    <div>
    <TopBar1></TopBar1>
    <div className='flex flex-row gap-4 justify-center items-center h-screen'>
    <BigButton href="/logbook_masinis">Logbook Data</BigButton>
    <BigButton href="/bunkering_masinis">Bunkering Data</BigButton>
    </div>
    </div>
  )
}

export default InputMasinis