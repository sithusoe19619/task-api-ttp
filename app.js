const express = require("express")
const { db } = require("./models")

const app = express()
const PORT = 3000
const taskRouter = require("./routes/tasks")

app.use(express.json())

app.get("/", (req, res) => {
        res.redirect("/api/tasks")
})

app.get("/health" , (req, res, next) => {
        res.json({status: "ok"})
})

app.use("/api/tasks", taskRouter)

app.use((error, req, res, next) => {
    console.error(error)
    res.sendStatus(500)
})

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})