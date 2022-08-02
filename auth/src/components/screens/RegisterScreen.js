import React,{useState} from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom"
import axios from "axios";

const RegisterScreen = () => {
  const navigate=useNavigate();
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [repeatPass,setRepeatPass]=useState("")
  const [error,setError]=useState("")
  const registerHandler=async()=>{

    const config={
      headers:{
        "Content-type":"application/json"
      }
    }
    if(password!==repeatPass) {
      setPassword("");
      setRepeatPass("")
      setError("Passwords do not match");

      setTimeout(()=>{
          setError("")
      },5000)
      return;
    }
      try{
        const {data}=await axios.post('http://localhost:7000/api/auth/register',{username,email,password},config);
        localStorage.setItem("authToken",JSON.stringify(data.token));
        navigate("/")
        
      }catch(err) {
          setError(err.response.data.error);
          setTimeout(()=>{
            setError("")
          },5000)
      }
  }
  return (
    <div className="min-h-screen min-w-full bg-purple-300 flex justify-center items-center">
      <div className="bg-purple-500 p-4 rounded shadow  flex justify-center flex-col items-center gap-7">
           {error && <span className="bg-red-500">{error}</span> } 
          <h3 className="text-white text-3xl">Register</h3>
          <input className="rounded shadow p-2 w-64" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} required/>
          <input type="email" className="rounded shadow p-2 w-64" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <input type="password" className="rounded shadow p-2 w-64" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
          <input type="password" className="rounded shadow p-2 w-64" placeholder="Repeat Password" value={repeatPass} onChange={(e)=>setRepeatPass(e.target.value)} required/>
          <button onClick={registerHandler} className="p-2 bg-purple-400 rounded shadow text-white">Register</button>
          <div className="flex">
          <span className="text-white mr-8">Already have an account?</span><Link to="/login">Sign in</Link>
          </div>
         
      </div>
      
    </div>
  )
}

export default RegisterScreen;
