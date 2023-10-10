
const jwt=require('jsonwebtoken')

const Authentication=(req,res,next)=>{
    let token=req.headers.authorization
    console.log(token)
    if(token){
        jwt.verify(token, 'hyscaler', function(err, decoded) {
            console.log(decoded)
            if(decoded){
                next()
            }else{
                res.send({"msg":"Unable To verify Token"})
            }
          });
    } else{
     res.send({"msg":"Please Login First"})
    }

}



module.exports={
    Authentication
}