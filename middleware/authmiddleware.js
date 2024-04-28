const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    console.log(token)
    
    req.body.userID=decoded.userID
    req.body.username=decoded.user
    if(token){
        jwt.verify(token, 'masai', function(err, decoded) {
            console.log(decoded) // bar
            next()
          });
    }else{
        res.status(500).json({message:"Token not found please login first"})
    }
}

module.exports=auth



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NjJkYmM5MTg0OTRjMjJhMjdmMDVmNjMiLCJ1c2VybmFtZSI6IlByaXlhbnNodSIsImlhdCI6MTcxNDI3MzQzN30.G2zYYTse0VnRD9VorJHhgRyE0EpKCW5Sng6IoFV2xEo