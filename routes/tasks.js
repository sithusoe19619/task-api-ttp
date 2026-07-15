const express = require("express")
const router = express.Router()

const Task = require("../models/Task")

router.get("/", async (req, res, next) => {
    try {
        const allTasks = await Task.findAll()
        res.status(200).json(allTasks)
    } catch (error) {
        next(error)
    }
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

router.post("/", async (req, res, next) => {
    try {
        const newTask = await Task.create({
            title: req.body.title,
            priority: req.body.priority,
            status: req.body.status,
            UserId: req.body.UserId
        })

        res.status(201).json(newTask)

    } catch (error) {
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