const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { where } = require("sequelize")
const { route } = require("./tasks")

router.get("/" , async (req, res, next) => {
    try {
        const email = req.query.email

        if (email) {
            const user = await User.findOne({where: {email: email}})

            if (!user) {    
                res.status(404).json({error: "User not found!"})
            }

            res.status(200).json(user)
        }

        const allUsers = await User.findAll()
        
        res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
})

module.exports = router