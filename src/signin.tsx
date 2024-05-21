import React, { useState } from 'react'
import  { DefaultInput, DefaultButton, TopBar3 } from './template_element'
import {BiArrowBack, BiX} from 'react-icons/bi'
import axios from 'axios';
const Signin = () => {
  const [pegawai, setPegawai] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handlePegawaiChange = (event:any) => {
    setPegawai(event.target.value);
  };
  const [loading, setLoading] = useState(false)
  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };
  const handleSignin = () => {
    const data = {
        username: pegawai,
        password: password
    }
    setLoading(true)
    axios.post("http://sezero.pythonanywhere.com/login/", data)
         .then(function (response) {
                    setLoading(false)
                    console.log(response.data);
                    var userData = response.data.user;
                    var userDataString = JSON.stringify(userData);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userData', userDataString);
                    if(userData.status === true){
                      window.location.href = `/${response.data.user.position}`
                    }
                    else{
                      window.location.href = `/confirmation`
                    }
                    

                })
                .catch(function (error) {
                    console.log(error);
                    setError(error.response.data.detail)
                    setLoading(false)
                });
  }

  return (
    <div>
    <TopBar3></TopBar3>
    <div className="flex flex-col gap-5 mt-10">
    {error && <div className='p-2 py-1 bg-red-300 rounded-xl flex flex-row justify-between items-center'><h1>{error}</h1><button onClick={()=>setError("")}><BiX size={20}></BiX></button></div>}
        <DefaultInput
          label="Employee ID"
          id="pegawai"
          name="pegawai"
          type="text"
          value={pegawai}
          onChange={handlePegawaiChange}
        />
        <DefaultInput
          label="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
          <DefaultButton onclick={handleSignin} text={loading ? "Loading...": "Sign In"} ></DefaultButton>
          <div className='w-full flex flex-row justify-between'>
          <h1>Are you an admin? <span><a className='text-blue-800' href="http://sezero.pythonanywhere.com/admin">Sign in as admin</a></span></h1>
          <h1>Don't have an account? <span><a href="/signup" className='text-blue-800'>Sign Up</a></span></h1>
          </div>
    </div>
  
    </div>
  )
}

export default Signin