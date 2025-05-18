import React,{useState,useEffect} from "react"

const TimerandBomb=()=>{
    const [time,setTime]=useState(Number(localStorage.getItem("time"))||0)
    const [r,setR]=useState(false)
    useEffect(()=>{
        localStorage.setItem("time",time)
    },[time])
    useEffect(()=>{
        if (!r) return
        const interval=setInterval(()=>{
            setTime(t=>t+1000)
        },1000)
        return ()=>clearInterval(interval)
    },[r])
    const timeF=()=>{
        const h=String(Math.floor(time/3600000)).padStart(2,"0")
    const m=String(Math.floor((time%3600000)/60000)).padStart(2,"0")
    const s=String(Math.floor((time%60000)/1000)).padStart(2,"0")
    return `${h} : ${m} ${s}`
    }
    return(
       <div>
         <p>{timeF()}</p>
         <button onClick={()=>setR(true)}>Start</button>
         <button onClick={()=>setR(t=>!t)}>pause</button>
         <button onClick={()=>{setR(false);setTime(0)}}>Stop</button>
       </div>
    )
}
export default TimerandBomb