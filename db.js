const Sequelize = require("sequelize")

const task_db = new Sequelize("postgres://localhost:5432/task_api", {
    logging: false,
})

module.exports = task_db