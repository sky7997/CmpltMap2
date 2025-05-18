require("dotenv").config()
const express=require("express")
const cookieParser=require("cookie-parser")
const router=express.Router()
const jwt=require("jsonwebtoken")
const User=require("../models/users")
const bcrypt=require("bcrypt")
const SECRET = process.env.JWT_SECRET;
router.use(cookieParser())
router.get("/",async (req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }
    catch(err){
        res.status(500).json({error:"server error"})
    }
})
router.post("/reg",async (req,res)=>{
    const {username,password}=req.body
   try{
    const fnd=await User.findOne({username})
    if (fnd){
      return res.status(401).json({error:"user already exists"})
    }
    const hashed= await bcrypt.hash(password,10)
    const newUser=new User({username,password:hashed})
    await newUser.save()
    res.status(200).json({message:"user Created"})
   }catch(err){
    res.status(500).json({error:"server error"})
   }
})
router.post("/login",async (req,res)=>{
    const {username,password}=req.body
   try{
    const fnd=await User.findOne({username})
    if (!fnd){
      return res.status(401).json({error:"no user found"})
    }
    const check= await bcrypt.compare(password,fnd.password)
    if (!check){
        return res.status(401).json({error:"password not match"})
      }
    const token=jwt.sign({username},SECRET,{expiresIn:"1d"})
    res.cookie("token",token,{
        httpOnly:true,
        maxAge:24*60*60*1000
    })
    
    res.status(200).json({message:"Login successfull"})
   }catch(err){
    res.status(500).json({error:"server error"})
   }
})
router.get("/protected",async (req,res)=>{
    const token=req.cookies.token
        if (!token){
            return res.status(401).json({error:"no token"})
          }
    try{
        
          const user= jwt.verify(token,SECRET)
          res.json({message:"user accessed",user})
    }catch(err){
        res.status(500).json({error:"server error"})
       }
}
)
router.post("/logout",async (req,res)=>{
    res.clearCookie("token")
    res.json({message:"logout successful"})
})
module.exports = router