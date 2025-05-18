const mongoose=require("mongoose")
const jobSchema= new mongoose.Schema({
    company:{type:String},
    jobname:{type:String},
    details:{type:String},
    cart:{type:Boolean, default:false}
})
module.exports=mongoose.model("Jobs",jobSchema)