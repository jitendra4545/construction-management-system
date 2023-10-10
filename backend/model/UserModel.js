

const mongoose=require(`mongoose`)



const UserSchema=mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    user_role:String,
    password:String,
    is_admin:String
},{
    versionKey:false,
    timestamps:true
})


const UserModel=mongoose.model("construction_user",UserSchema)


module.exports={
    UserModel
}