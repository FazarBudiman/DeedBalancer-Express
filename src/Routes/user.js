const app = require('express')
const user = app.Router()
const controller = require('../Controllers/userController')

user.post("/register", controller.register)
user.post("/login", controller.login)

module.exports = user
