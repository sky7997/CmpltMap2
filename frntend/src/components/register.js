import React, { useState} from "react"
import {useNavigate} from "react-router-dom"
const Register=()=>{
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [msg,setmsg]=useState("")
const navigate=useNavigate()
const regF=()=>{
    if (!username || !password) return setmsg("fill details")
        const newdat={username,password}
    fetch("http://localhost:5000/users/reg",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newdat)
    })
    .then(res=>res.json())
    .then(dat=>{
        if (dat.error) {
            setmsg(dat.error)
        }
        else{
            
            setmsg("register successfull")
            setUsername("")
            setPassword("")
            navigate("/login")
        }
    })
}
return(
    <div>
        <h2>Register Page</h2>
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
        <button onClick={regF}>Register</button>
        <h2>If Already registered</h2>
        <button onClick={()=>navigate("/login")}>Login </button>
    </div>
)
}
export default Register