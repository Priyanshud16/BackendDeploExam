const {Schema,model}=require("mongoose")

const noteSchema=new Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    Data:{type:Date,default:Date.now},
    userID:{type:String},
    username:{type:String}
},{versionKey:false})

const noteModel=model("Note",noteSchema)

module.exports=noteModel