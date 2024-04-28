const {Router}=require("express")
const noteModel = require("../model/noteModel")
const auth = require("../middleware/authmiddleware")

const noteRouter=Router()

noteRouter.post("/create",auth,async(req,res)=>{
    const {title,description,userID,username}=req.body
    try {
        const note=new noteModel({title,description,userID,username})
        await note.save()
        res.status(201).json({message:"note created successfullly"})
    } catch (error) {
        
    }
})

noteRouter.get("/",auth,async(req,res)=>{
    const {userID,}=req.body
    try {
        const notes=await noteModel.find({userID})
        res.status(201).json({message:"Get the notes",notes})
    } catch (error) {
        
    }
})

noteRouter.patch("/update/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
       await noteModel.findByIdAndUpdate({_id:id},req.body)
         res.status(201).json({message:"User updated Successfully"})
    } catch (error) {
        res.status(404).json({message:"Something Went Wrong"})
    }
})

noteRouter.delete("/delete/:id",auth,async(req,res)=>{
    const {id}=req.params
    try {
       await noteModel.findByIdAndDelete({_id:id},req.body)
         res.status(201).json({message:"User Deleted Successfully"})
    } catch (error) {
        res.status(404).json({message:"Something Went Wrong"})
    }
})

module.exports=noteRouter