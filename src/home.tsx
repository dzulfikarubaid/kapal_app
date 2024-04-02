import React, { useEffect } from 'react'

const Home = () => {
  function isTokenValid() {
    return localStorage.getItem('token') !== null;
}
function redirectUser() {
    if (isTokenValid()) {
        // Token masih valid, arahkan ke halaman tertentu
        window.location.href = `/${JSON.parse(localStorage.getItem('userData')!).position}`;
    } 
}
useEffect(() => {
  redirectUser();
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