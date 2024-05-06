import axios from 'axios';
import React, { useEffect } from 'react'

export async function getStatus(){
    await axios.get(`https://sezero.pythonanywhere.com/user/${JSON.parse(localStorage.getItem('userData')!).id}`)
    .then((response) => {
        if(response.data.status === true){
           window.location.href = `/${JSON.parse(localStorage.getItem('userData')!).position}`;
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
    <div>
      <div className="flex flex-col justify-center items-center  h-screen text-white gap-5 w-full text-center"> 
  <img src="../ship.jpeg" className="w-[400px]" alt=""/>
    <a href="/signin" className="bg-indigo-500 rounded-xl p-2 py-1 w-full">Sign In</a>
    <a href="/signup" className="bg-indigo-500 rounded-xl p-2 py-1 w-full">Sign Up</a>
    </div>
    </div>
  )
}
export default Home