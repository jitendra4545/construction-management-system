const mongoose = require('mongoose')


const ProjectSchema = mongoose.Schema({
    project_name: String,
    project_desc: String,
    status: Boolean,
    task_assignment: Array,
    due_date: String,
    project_blueprint: String,
    project_assign:String
}, {
    timestamps: true,
    versionKey: false
})


const ProjectModel = mongoose.model("construction_project", ProjectSchema)



module.exports = {
    ProjectModel
}