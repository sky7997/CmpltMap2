require("dotenv").config()
const express=require("express")
const cors=require("cors")
const port=process.env.port || 5000
const mongoose=require("mongoose")
const userRoute=require("./routes/usersRouter")
const jobsroute=require("./routes/jobsRouter")
const todos=require("./routes/todosRouter")
const app=express()
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
mongoose.connect(process.env.MONGO_URI)
.then(console.log("mongoDB connected"))
.catch((err)=>console.error("server issue",err))
app.use("/users",userRoute)
app.use("/jobs",jobsroute)
app.use("/todos",todos)
app.listen(port,()=>{
    console.log(`server running on http://localhost:${port}`)
})