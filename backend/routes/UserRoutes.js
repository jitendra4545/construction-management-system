const bcrypt = require('bcrypt')
const express = require(`express`)
const { UserModel } = require("../model/UserModel")
const jwt = require('jsonwebtoken')
const { Authentication } = require('../middleware/auth')
const UserRouter = express.Router()


UserRouter.post("/register", async (req, res) => {
    const { email, name, password, user_role, isAdmin, isActive } = req.body

    try {
        const data = await UserModel.find({ email })
        console.log(data.length)
        if (data.length > 0) {
            res.send({ "msg": "Email Already In Use" })
        } else {
            bcrypt.hash(password, 10, async function (err, hash) {
                if (hash) {
                    let newData = new UserModel({ email, name, password: hash, user_role, isAdmin, isActive: false })
                    await newData.save()
                    res.send({ msg: "User Registered Successfully" })
                } else {
                    res.send({ "msg": "Unable to Hash Password" })
                }
            });
        }




    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Cannot Register", "err": err.message })
    }
})



UserRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        let SingleUser = await UserModel.findOne({ email: email })
        
        if (SingleUser) {
            console.log(password, SingleUser.password)
          
            bcrypt.compare(password, SingleUser.password, async function (err, result) {
                console.log(result)
                if (result) {
                    let token = jwt.sign({ userID: SingleUser._id }, 'hyscaler');
                    await UserModel.findOneAndUpdate({ email: email }, { isActive: true })
                    res.send({ "msg": "User Login Successfully", "token": token })
                } else {
                    res.send({ "msg": "Something Went Wrong ! Unable to generate token", })
                }
            });
        } else {
            res.send({ "msg": "Unable to FindUser Please Register First" })
        }
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Cannot Login ", "err": err.message })
    }
})


UserRouter.get("/", async (req, res) => {
    try {
        let users = await UserModel.find()
        res.send(users)
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Can not get Users ", "err": err.message })
    }
})


UserRouter.delete("/:id", async (req, res) => {
    let id = req.params.id

    try {
        let users = await UserModel.findOneAndDelete({ _id: id })
        res.send({ "msg": "User Deleted Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Can not delete User ", "err": err.message })
    }
})


UserRouter.patch("/logout",Authentication,async(req,res)=>{
    let userid = req.body.UserId
    try{
         await UserModel.findOneAndUpdate({_id:userid},{isActive:false})
         res.send({"msg":"User Successfully Logged out"})
    }catch(err){
        res.send({ "msg": "Something Went Wrong ! Can not Logout User ", "err": err.message })
    }
})




UserRouter.get("/single", Authentication, async (req, res) => {
    let userid = req.body.UserId
    try {
        let data = await UserModel.find({ _id: userid })
        res.send(data)
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Can not get Users ", "err": err.message })
    }
})


module.exports = {
    UserRouter

}
