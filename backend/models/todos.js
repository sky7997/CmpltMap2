const mongoose=require("mongoose")
const todoSchema = new mongoose.Schema({
    todo: { type: String, required: true },
    completed: { type: Boolean, default: false }
  }, { timestamps: true });//timestamps for time creation actually not nneeded u can remove it
  
  module.exports = mongoose.model("Todo", todoSchema);