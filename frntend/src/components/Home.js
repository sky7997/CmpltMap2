import React,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
const Home=()=>{
    const [data,setData]=useState([])
    const [page,setPage]=useState(1)
const navigate=useNavigate()
useEffect(()=>{
    fetch("http://localhost:5000/jobs")
    .then(res=>res.json())
    .then(dat=>setData(dat))
},[])
const addcartF=(id)=>{
    const data={cart:true}
    fetch(`http://localhost:5000/jobs/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    }
useEffect(()=>{
    const onScroll=()=>{
        if (window.innerHeight+window.scrollY >= document.body.scrollHeight-10){
            setPage(p=>p+1)
        }
    }
    window.addEventListener("scroll",onScroll)
    return ()=> window.removeEventListener("scroll",onScroll)
},[])
return(
    <div>
        <h2>Welcome to sdbhsgj ehfbjev sehjvgsyege gsdgseg sdjgbsdg</h2>
        <button onClick={()=>navigate("/jobsInfiniteScroll")}>jobsInfiniteScroll</button>
        <button onClick={()=>navigate("/todos")}>Todos</button>
        <button onClick={()=>navigate("/vendingmachine")}>Vending Machine</button>
        <button onClick={()=>navigate("/timerandbomb")}>timer and Bomb</button>
        {<ul>
        {data.map(t=>(
        <li key={t._id}>{t.jobname}<p>{t.company}</p><p>{t.details}</p> 
        <button onClick={()=>addcartF(t._id)}>Add to Cart</button></li>
    ))}
        </ul>}
    </div>
)
}
export default Home