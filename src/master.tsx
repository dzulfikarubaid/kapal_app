import React from 'react'
import { BigButton, TopBar2 } from './template_element'

const Master = () => {
  return (
    <div>
    <TopBar2></TopBar2>
    <div className='flex flex-row gap-10 justify-center h-screen items-center'>
    <BigButton href="/master-dr" >Data Deck Recap</BigButton>
    <BigButton href="/master-er">Data Engine Recap</BigButton>
    <BigButton href="/master-nr" >Noon Report Recap</BigButton>


    </div>
    </div>
  )
}

export default Master