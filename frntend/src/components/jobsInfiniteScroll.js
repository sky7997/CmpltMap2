import React, { useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
const Jobs=()=>{
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [cmpny,setCmpny]=useState("")
    const [name,setName]=useState("")
    const [details,setDetails]=useState("")
    const [editid,setEditId]=useState(null) 
   
    useEffect(()=>{
        fetch("http://localhost:5000/jobs")
        
        .then(res=>res.json())
        .then(dat=>setData(dat))
    },[])
const submitF=(e)=>{
    e.preventDefault()
    const data={company:cmpny,jobname:name,details:details}
    fetch("http://localhost:5000/jobs",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
    .then(dat=>{
        setData(prev=>[...prev,dat])
        setCmpny("")
        setName("")
        setDetails("")
    })
}
const editF=(id)=>{
    const data={company:cmpny,jobname:name,details:details}
    fetch(`http://localhost:5000/jobs/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }).then(res=>res.json())
    .then(dat=>{
        setData(prev=>prev.map(t=>t._id===id ? {...t,...dat}: t))
        setCmpny("")
        setName("")
        setDetails("")
        setEditId(null)
    })
}
const deleteF=(id)=>{
    
    fetch(`http://localhost:5000/jobs/${id}`,{
        method:"DELETE"
    }).then(res=>res.json())
    .then(()=>{
        setData(prev=>prev.filter(t=>t._id!==id ))
        
    })
}
const edited=(id)=>{
const fnd=data.find(t=>t._id===id)
setEditId(fnd._id)
setCmpny(fnd.company)
setName(fnd.jobname)
setDetails(fnd.details)

}
return(
    <div>
      <div>
      <form onSubmit={submitF}>
      <h2>Company</h2>
        <input
        type="text"
        value={cmpny}
        onChange={(e)=>setCmpny(e.target.value)}
        />
        <h2>Jobname</h2>
        <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
        <h2>details</h2>
        <input
        type="text"
        value={details}
        onChange={(e)=>setDetails(e.target.value)}
        />
        {editid ? <p></p> : <button type="submit">create</button>}
      </form>
      </div>
      {editid ? <button onClick={()=>editF(editid)}>Edit</button>: <p></p>}
      {<ul>
        {data.map(t=>(
        <li key={t._id}>{t.company}<p>{t.jobname}</p><p>{t.details}</p> <button onClick={()=>edited(t._id)}>Edit</button>
        <button onClick={()=>deleteF(t._id)}>Delete</button></li>
    ))}
        </ul>}
    </div>
)
}
export default Jobs