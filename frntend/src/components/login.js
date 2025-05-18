import React, { useState} from "react"
import {useNavigate} from "react-router-dom"
const Login=({onlogin})=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [msg,setmsg]=useState("")
const navigate=useNavigate()
const logF=()=>{
    if (!username || !password) return setmsg("fill details")
        const newdat={username,password}
    fetch("http://localhost:5000/users/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify(newdat)
    })
    .then(res=>res.json())
    .then(dat=>{
        if (dat.error) {
            setmsg(dat.error)
        }
        else{
            onlogin()
            setmsg("Login successfull")
            setUsername("")
            setPassword("")
        }
    })
}
return(
    <div>
        <h2>Login Page</h2>
        <input
        type="text"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        />
         
        <input
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
        {msg && <p>{msg}</p>}
        <button onClick={logF}>Login</button>
        <h2>If not registered</h2>
        <button onClick={()=>navigate("/register")}>Register </button>
    </div>
)
}
export default Login