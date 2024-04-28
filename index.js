const express=require("express")
const ConnectedDB = require("./config/db")
const userRouter = require("./Routes/userRoutes")
const noteRouter = require("./Routes/noteRoter")
const dotenv=require("dotenv").config()
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())
app.use("/user",userRouter)
app.use("/note",noteRouter)
app.get("/",(req,res)=>{
    res.send("This is our home route")
})

app.listen(process.env.PORT,async ()=>{
    try {
       await ConnectedDB
        console.log("Server is running");
    } catch (error) {
        
    }

})