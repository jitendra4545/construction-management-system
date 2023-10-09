

require(`dotenv`).config()
const express = require('express')
const { connection } = require('./config/db')
const { UserRouter } = require('./routes/UserRoutes')
const app = express()
app.use(express.json())
app.use("/user",UserRouter)
app.get("/", (req, res) => {
    res.send("Welcome to Construction Management")
})





app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("DB connected Successfully")
    } catch (err) {
        console.log(`Unable To Connect DB`)

    }
    console.log(`Server Running on Port ${process.env.port}`)
})