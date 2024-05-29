import React from 'react'
import { BigButton, TopBar2 } from './template_element'

function Director() {

  return (
    <div>
    <TopBar2></TopBar2>
    <div className='flex h-screen flex-row gap-10 justify-center items-center'>
    <BigButton href="/director-pdo" >Plotting Data Operations</BigButton>
    <BigButton href="/director-pdf" >Plotting Data Financial</BigButton>
    </div>
    </div>
  )
}

export default Director