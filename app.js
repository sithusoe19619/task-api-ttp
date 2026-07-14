const express = require("express")
const { db } = require("./models")

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/health" , (req, res, next) => {
    try {
        res.json({status: "ok"})
    } catch (error) {
        next(error)
    }
})

app.use((error, req, res, next) => {
    console.error(error)
    res.sendStatus(500)
})

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
})