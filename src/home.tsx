import axios from 'axios';
import React, { useEffect } from 'react'

export async function getStatus(){
    await axios.get(`https://sezero.pythonanywhere.com/user/${JSON.parse(localStorage.getItem('userData')!).id}`)
    .then((response) => {
        if(response.data.status === true && response.data.position !== 'admin'){
           window.location.href = `/${JSON.parse(localStorage.getItem('userData')!).position}`;
        }
        else if(response.data.position === 'admin'){
          window.location.href = '/'
        }
        else{
          window.location.href = `/confirmation`;
        }
    })
  }


const Home = () => {
  function isTokenValid() {
    return localStorage.getItem('token') !== null;
  
}

useEffect(() => {
  getStatus();
}, [])
  return (
    <div className='px-20'>
      <div className="flex flex-col justify-around items-center h-[700px] text-white gap-5 w-full text-center"> 
      <h1 className="text-6xl font-bold text-indigo-800 ">SMART SHIP DATA LOGGING</h1>

    <div className='flex flex-col gap-6 w-full'>
    <a href="/signin" className="bg-indigo-500 rounded-xl p-2 py-1 w-full">Sign In</a>
    <a href="/signup" className="bg-indigo-500 rounded-xl p-2 py-1 w-full">Sign Up</a></div>
    </div>
    </div>
  )
}
export default Home