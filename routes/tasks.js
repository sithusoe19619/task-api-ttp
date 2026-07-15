const express = require("express")
const router = express.Router()
const { Op } = require("sequelize") 
const Task = require("../models/Task")


router.get("/", async (req, res, next) => {

    const { search , status , minPriority} = req.query
    const where = {}

    if(status) {
        where.status = status
    }

    if(minPriority) {
        where.priority = {[Op.gte] : Number(minPriority)}
    }

    if(search){
        where.title = {[Op.iLike] : `%${search}`}
    }

    const allTasks = await Task.findAll({where})
    res.status(200).json(allTasks)
})

router.get("/:id", async (req, res, next) => {
    try {
        const taskId = Number(req.params.id)
        const taskById = await Task.findByPk(taskId)
        
        if(!taskById) {
            return res.status(404).json({error: "Task not found!"})
        }

        res.status(200).json(taskById)
    } catch (error) {
        next(error)
    }
})

function requireTitle(req, res, next) {
    if(!req.body.title) {
        return res.status(400).json({error: "Title is required!"})
    }
    next()
}

router.post("/", requireTitle, async (req, res, next) => {
    try {
        const newTask = await Task.create(req.body)
        res.status(201).json(newTask)

    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({ error: error.errors[0].message })
        }
        next(error)
    }
})

router.patch("/:id" , async (req, res, next) => {
    try {
        const taskId = Number(req.params.id)
        const taskToUpdate = await Task.findByPk(taskId)

        if(!taskToUpdate){
            res.status(404).json({error: "User not found!"})
        }

        await taskToUpdate.update(req.body)

        res.status(200).json(taskToUpdate)

    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const taskId = Number(req.params.id)
        const taskToDelete = await Task.findByPk(taskId)

        if(!taskToDelete){
            res.status(404).json({error: "Task not found!"})
        }

        await taskToDelete.destroy()

        res.status(204).json(Task)
    } catch (error) {
        next(error)
    }
})

module.exports = router