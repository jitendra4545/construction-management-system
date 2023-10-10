


const express = require(`express`)
const { ProjectModel } = require("../model/ProjectModel")
const ProjectRouter = express.Router()




ProjectRouter.post("/", async (req, res) => {
    let data = req.body
    try {
        let newData = new ProjectModel(data)
        await newData.save()
        res.send({ "msg": "Project Added Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Can not add project ", "err": err.message })
    }
})

ProjectRouter.get("/", async (req, res) => {

    try {
        let data = await ProjectModel.find()
        res.send(data)
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Can not get project ", "err": err.message })
    }
})

ProjectRouter.patch("/:id", async (req, res) => {
    let id = req.params.id
    console.log(id)
    let data = req.body
    try {
        let newData = await ProjectModel.findOneAndUpdate({ _id: id }, data)
        console.log(newData)
        res.send({ "msg": "Project Upadated Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Can not update project ", "err": err.message })
    }
})

ProjectRouter.delete("/:id", async (req, res) => {
    let id = req.params.id
    try {
        await ProjectModel.findOneAndDelete({ _id: id })
        res.send({ "msg": "Project Deleted Successfully" })
    } catch (err) {
        res.send({ "msg": "Something Went Wrong ! Can not delete project ", "err": err.message })
    }
})



module.exports = {
    ProjectRouter
}