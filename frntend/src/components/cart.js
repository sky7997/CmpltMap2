import React,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
const Cart=()=>{
    const [data,setData]=useState([])
   

useEffect(()=>{
    fetch("http://localhost:5000/jobs")
    .then(res=>res.json())
    .then(dat=>{
        const datt=dat.filter(t=>t.cart)
        setData(datt)
    })
},[])
const removecartF=(id)=>{
    const data={cart:false}
    fetch(`http://localhost:5000/jobs/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(()=>{
        setData(prev=>prev.filter(t=>t._id!==id))
    })
    }

return(
    <div>
       
        {<ul>
        {data.map(t=>(
        <li key={t._id}>{t.company}<p>{t.jobname}</p><p>{t.details}</p> 
        <button onClick={()=>removecartF(t._id)}>Remove from Cart</button></li>
    ))}
        </ul>}
    </div>
)
}
export default Cart