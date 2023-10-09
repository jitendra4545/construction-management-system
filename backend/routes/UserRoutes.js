
const express=require(`express`)

const UserRouter=express.Router()

UserRouter.get("/",(req,res)=>{
    res.send("hi")
})

UserRouter.post("/register",async(req,res)=>{
     const data=req.body
     console.log(data)
    try{

    }catch(err){

    }
})

UserRouter.post("/login",async(req,res)=>{

    try{

    }catch(err){
        
    }
})





module.exports={
    UserRouter

}
