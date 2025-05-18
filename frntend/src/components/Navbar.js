import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
const Navbar=({Logout})=>{
    const [count,setCount]=useState(0)
    
    useEffect(()=>{
     const Interval =setInterval(()=>{
        fetch("http://localhost:5000/jobs")
        .then(res=>res.json())
        .then(dat=>{
            const datt=dat.filter(t=>t.cart)
            
                setCount(datt.length)
           
        }) },3000)
        return ()=> clearInterval(Interval)
    },[])
    return(
       <nav>
         <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
        <Link to="/cart">CArt {count}</Link>
        <Link to="/calculator">Calculator</Link>
        <button onClick={Logout}>Logout</button>
        </nav>
    )
}
export default Navbar