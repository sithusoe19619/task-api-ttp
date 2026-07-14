const { DataTypes } = require("sequelize")
const db = require("../db")

const Task = db.define("Task", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    priority: {
        type: DataTypes.INTEGER,
        allowNull = false,
        defaultValue: 1
    }
})

module.exports = Task