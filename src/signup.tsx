import React, { useState } from 'react'
import  { DefaultButton, TopBar3, DefaultInput } from './template_element'
import {BiArrowBack, BiX} from 'react-icons/bi'
import axios from 'axios';
const Signup = () => {
  const [pegawai, setPegawai] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [error, setError] = useState('');
  const handlePegawaiChange = (event:any) => {
    setPegawai(event.target.value);
  };

  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };
  const handleNameChange = (event:any) => {
    setName(event.target.value);
  }
  const handleCPasswordChange = (event:any) => {
    setCPassword(event.target.value);
  };
  const handleSignup = () => {
    axios.post("http://localhost:8000/register/", {username: pegawai, password: password, name: name, position: position, confirm_password: cpassword})
         .then(function (response) {
                    console.log(response.data);
                    var userData = response.data.user;
                    var userDataString = JSON.stringify(userData);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userData', userDataString);
                    window.location.href = `/${response.data.user.position}`
                })
                .catch(function (error) {
                    console.log(error);
                     setError(error.response.data.detail)
                });
  }

  return (
    <div>
    <TopBar3></TopBar3>
    <div className="flex flex-col gap-5 mt-10">
    {error && <div className='p-2 py-1 bg-red-300 rounded-xl flex flex-row justify-between items-center'><h1>{error}</h1><button onClick={()=>setError("")}><BiX size={20}></BiX></button></div>}
      <DefaultInput
          label="Nama"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <DefaultInput
          label="Nomor Pegawai"
          id="pegawai"
          name="pegawai"
          type="text"
          value={pegawai}
          onChange={handlePegawaiChange}
        />
        <label htmlFor="position">Posisi</label>
        <select value={position} onChange={
          (event) => {
            setPosition(event.target.value)
          }
        } id={`position`} name={`position`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option selected disabled value={""}>Pilih Posisi</option>
             <option value="direktur">Direktur</option>
    <option value="mk">Manajer Keuangan</option>
    <option value="mo">Manajer Operasional</option>
    <option value="do">Divisi Operasional</option>
    <option value="kapten">Kapten</option>
    <option value="kkm">KKM</option>
    <option value="mualim">Mualim</option>
    <option value="masinis">Masinis</option> 
          </select>
        <DefaultInput
          label="Password"
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <DefaultInput
          label="Confirm Password"
          id="cpassword"
          name="cpassword"
          type="password"
          value={cpassword}
          onChange={handleCPasswordChange}
        />
          <DefaultButton onclick={handleSignup} text={"Sign Up"} ></DefaultButton>
    </div>
  
    </div>
  )
}

export default Signup