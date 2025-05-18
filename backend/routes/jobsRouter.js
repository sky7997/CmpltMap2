
const express=require("express")

const router=express.Router()

const Jobs=require("../models/jobs")



router.get("/",async (req,res)=>{
    try{
        const jobs=await Jobs.find()
        res.json(jobs)
    }
    catch(err){
        res.status(500).json({error:"server error"})
    }
})
router.post("/",async (req,res)=>{
    const newdat=req.body
   try{
    
    const newUser=new Jobs(newdat)
    await newUser.save()
    res.status(200).json(newUser)
   }catch(err){
    res.status(500).json({error:"server error"})
   }
})
router.put("/:id",async (req,res)=>{
    
   try{
    const updated=await Jobs.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
    res.status(200).json(updated)
   }catch(err){
    res.status(500).json({error:"server error"})
   }
})
router.delete("/:id",async (req,res)=>{
    
    try{
     const deleted=await Jobs.findByIdAndDelete(req.params.id)
     
     res.json({message:`deleted${req.params.id}`})
    }catch(err){
     res.status(500).json({error:"server error"})
    }
 })

 module.exports = router