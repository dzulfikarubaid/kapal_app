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
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handlePegawaiChange = (event:any) => {
    setPegawai(event.target.value);
  };
  const [loading, setLoading] = useState(false)
  const handlePasswordChange = (event:any) => {
    setPassword(event.target.value);
  };
  const handleNameChange = (event:any) => {
    setName(event.target.value);
  }
  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  }
  const handleCPasswordChange = (event:any) => {
    setCPassword(event.target.value);
  };
  const handleSignup = () => {
    setLoading(true)
    if(password !== cpassword){
      setError("Password and Confirm Password must be same")
      setLoading(false)
      return
    }
    axios.post("http://sezero.pythonanywhere.com/register/", {username: pegawai, password: password, name: name, email:email, position: position, confirm_password: cpassword})
         .then(function (response) {
                    setLoading(false)
                    console.log(response.data);
                    var userData = response.data.user;
                    var userDataString = JSON.stringify(userData);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userData', userDataString);
                    window.location.href = `/confirmation`
                })
                .catch(function (error) {

                    console.log(error);
                    if(error.response.data.error.username[0] === "A user with that username already exists."){
                      setError("A user with that employee ID already exists.")
                      return
                    }
                     setError("Please fill all the fields")
                    setLoading(false)
                }
                );
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
          label="Name"
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <DefaultInput
          label="Email"
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="position">Position</label>
        <select value={position} onChange={
          (event) => {
            setPosition(event.target.value)
          }
        } id={`position`} name={`position`} className="bg-white border focus:outline-none border-gray-400 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 ">
            <option selected disabled value={""}>Choose your position</option>
             <option value="director">Director</option>
    <option value="fm">Financial Manager</option>
    <option value="om">Operational Manager</option>
    <option value="od">Operational Division</option>
    <option value="master">Master</option>
    <option value="ce">Chief Engineer</option>
    <option value="officer">Officer</option>
    <option value="engineer">Engineer</option> 
    {/* <option value="admin">Admin</option> */}
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
          <DefaultButton onclick={handleSignup} text={loading?"Loading...":"Sign Up"} ></DefaultButton>
    </div>
  
    </div>
  )
}

export default Signup