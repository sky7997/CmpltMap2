import React, { useState } from 'react';

const coffeeOptions = [
  { name: "Espresso", basePrice: 2 },
  { name: "Cappuccino", basePrice: 3 },
  { name: "Latte", basePrice: 3.5 },
  { name: "Americano", basePrice: 2.5 },
];

const sizes = [
  { name: "Small", multiplier: 1 },
  { name: "Medium", multiplier: 1.5 },
  { name: "Large", multiplier: 2 },
];

const addOns = [
  { name: "Extra Shot", price: 0.7 },
  { name: "Milk", price: 0.4 },
  { name: "Sugar", price: 0.3 },
  { name: "Whipped Cream", price: 0.6 },
];

const TAX_RATE = 0.10;
const Vendingmachine=()=>{
const [cof,setCof]=useState("")
const [size,setSize]=useState("")
const [add,setAdd]=useState([])
const [qnty,setQnty]=useState(1)
const [brew,setBrew]=useState(false)
const [ready,setReady]=useState(false)
const [total,setTotal]=useState({subtotal:0, tax:0, total:0})
const cofChange=(e)=>{
const chng=e.target.value
setCof(chng)
calcaulate(chng,size,qnty,add)
}
const handleSize=(e)=>{
const sc=e.target.value
setSize(sc)
calcaulate(cof,sc,qnty,add)
}
const qntychange=(e)=>{
  const qc=parseInt(e.target.value)
  setQnty(qc)
  calcaulate(cof,size,qc,add)
}
const handleaddon=(e)=>{
  const {checked,value}=e.target
  let checkd= checked ? [...add,value]: add.filter(t=>t !== value)
  setAdd(checkd)
  calcaulate(cof,size,qnty,checkd)
  
}
const calcaulate=(cof,size,qnty,add)=>{
  if (!cof || !size) return
  const coffee=coffeeOptions.find(t=>t.name===cof)
  const sizeval=sizes.find(t=>t.name===size)
  const baseprice=coffee.basePrice*sizeval.multiplier
  const addsumm=add.reduce((sum,add)=>{
    const fnd=addOns.find(t=>t.name===add)
    return sum + (fnd ? fnd.price : 0)
  },0)
  const subtotal=(baseprice+addsumm)*qnty
  const taxx=subtotal*TAX_RATE
  const total=subtotal+taxx
  setTotal(
    {
      subtotal:subtotal.toFixed(2),
      tax:taxx.toFixed(2),
      total:total.toFixed(2)
    }
  )
}
const brewF=()=>{
  setBrew(true)
  setTimeout(()=>{
    setReady(true)
    setBrew(false)
  },3000)
}
const resetFunc=()=>{
  setReady(false)
  setBrew(false)
  setAdd([])
  setCof("")
  setQnty("")
  setSize("")
  setTotal({subtotal:0,tax:0,total:0})
}
return (
<div>
  <h2>Cofee Vending Machine</h2>
  <label>Select Coffee</label>
  <select value={cof} onChange={cofChange}>
    <option>--choose</option>
    {coffeeOptions.map((i,k)=>(
      <option key={k} value={i.name}>
        {i.name}-{i.basePrice}
      </option>
    ))}
    </select>
    <label>sizes</label>
    {sizes.map((t,k)=>(
      <label key={k}>
        <input
        type="radio"
        onChange={handleSize}
        value={t.name}
        checked={size===t.name}
        />{t.name}
      </label>
    ))}
    <label>Qnty</label>
    <input
    type="number"
    min="1"
    onChange={qntychange}
    value={qnty}
    />
    <label>Addons</label>
    {addOns.map((t,k)=>(
      <label key={k}>
        <input
        type="checkbox"
        onChange={handleaddon}
        value={t.name}
        checked={add.includes(t.name)}
        />{t.name}
      </label>))}
      <p>totals</p>
      <p>subtotal{total.subtotal}  {total.tax}  {total.total}</p>

      <button onClick={brewF}>Brew</button>
      {brew && <p>Brewing</p>}
      {ready && <p>Ready</p>}
      <button onClick={resetFunc}>Reset</button>
</div>
  )
}

export default Vendingmachine