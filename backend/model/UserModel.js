

const mongoose = require(`mongoose`)



const UserSchema = mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    user_role: String,
    password: String,
    isAdmin:Boolean,
    isActive:Boolean
}, {
    versionKey: false,
    timestamps: true
})


const UserModel = mongoose.model("construction_user", UserSchema)


module.exports = {
    UserModel
}