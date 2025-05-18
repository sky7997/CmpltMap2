import React, {useState} from "react"

const Calculator=()=>{
    const [input,setInput]=useState("")
    const calF=(t)=>{
        try{
            if (t==="="){
                const ans=eval(input).toString()
                setInput(ans)
            }else {
                setInput(prev=>prev+t)
            }
        }catch (err){
            setInput("err")
        }
    }
    const clrF=()=>{
        setInput("")
    }
    return(
        <div>
            <input
                type="text"
                value={input}
                />
            {
                
                ["1","2","3","4","5","6","7","8","9","0","+","-","*","/","="].map(t=>(
                    <button  onClick={()=>calF(t)}>{t}</button>
                ))
            }
            <button onClick={clrF}>Clear</button>
        </div>
    )
}
export default Calculator