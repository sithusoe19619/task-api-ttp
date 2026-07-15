const express = require("express")
const { db } = require("./models")

const app = express()
const PORT = 3000
const taskRouter = require("./routes/tasks")
const userRouter = require("./routes/users")

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`)
    next()
}

app.use(express.json())
app.use(logger)

app.get("/", (req, res) => {
        res.redirect("/api/tasks")
})

app.get("/health" , (req, res, next) => {
        res.json({status: "ok"})
})

app.use("/api/tasks", taskRouter)
app.use("/api/users", userRouter)

app.use((req, res) => {
    res.status(404).json({error: "Not found!"})
})

app.use((error, req, res, next) => {
    console.error(error)
    res.status(500).json({error: "Something went wrong"})
})

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})