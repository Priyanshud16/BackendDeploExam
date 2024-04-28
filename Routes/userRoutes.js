const {Router}=require("express");
const UserModel = require("../model/userModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userRouter=Router()

userRouter.post("/register",async(req,res)=>{
    const {email,password,username}=req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.status(500).json({message:"Error while hasing the password"})
            }else{
                const user=new UserModel({email,password:hash,username})
                await user.save()
                res.status(201).json({message:"User registered Successfully"})
            }
        });
    } catch (error) {
        res.status(404).json({message:"Something Wents Wrong",error})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == true
                if(result){
                  const token=  jwt.sign({userID:user._id,username:user.username},'masai')
                  res.status(201).json({message:"user Login Successfully",token})
                }else{
                    res.status(500).json({message:"Password is incorrect"})
                }
            });
        }else{
            res.status(500).json({message:"Please Register First"})
        }
    } catch (error) {
        res.status(404).json({message:"Something Wents Wrong",error})
    }
})

module.exports=userRouter
