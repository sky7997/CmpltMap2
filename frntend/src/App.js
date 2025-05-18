import React,{useState,useEffect} from "react"
import Calculator from "./components/calculator";
import Cart from "./components/cart";
import Home from "./components/Home";
import Jobs from "./components/jobsInfiniteScroll";
import Login from "./components/login";
import Navbar from "./components/Navbar";
import Register from "./components/register";
import TimerandBomb from "./components/timerAndBomb";
import Todos from "./components/Todos";
import Vendingmachine from "./components/vendingMachine";
import {
  Route,
  Routes,
  Navigate,
  useNavigate,
  BrowserRouter as Router
}from "react-router-dom"
import './App.css';



const Wrapper=()=>{
  const [yes,setYes]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
    fetch("http://localhost:5000/users/protected",{
      credentials:"include"
    })
    .then(res=>res.json())
    .then(dat=>{
      if (dat.user) {
        setYes(true)
      }else {
        setYes(false)
        navigate("/login")
      }
    })
},[navigate])
const onlogin=()=>{
  setYes(true)
  navigate("/")
}
const onlogout=()=>{
  
    fetch("http://localhost:5000/users/logout",{
      method:"POST",
      credentials:"include"
    },)
    .then(()=>{
      setYes(false)
      navigate("/login")
    })
    
}
return (
  <>
  <Navbar Logout={onlogout}/>
  <Routes>
  {!yes ? (<>
    <Route path="*" element={<Login onlogin={onlogin}/>}/>
    <Route path="/register" element={<Register/>}/>
    </>) : (
    <>
  <Route path="/" element={<Home/>}/>
  <Route path="/calculator" element={<Calculator/>}/>
  <Route path="/cart" element={<Cart/>}/>
  <Route path="/jobsInfiniteScroll" element={<Jobs/>}/>
  <Route path="/timerandbomb" element={<TimerandBomb/>}/>
  <Route path="/vendingmachine" element={<Vendingmachine/>}/>
  <Route path="/todos" element={<Todos/>}/>
  <Route path="*" element={<Navigate to="/"/>}/>
    </>
  )}
  </Routes>
  </>
)
}

const App=()=>{
return(
  <Router>
    <Wrapper/>
  </Router>
)
}
export default App