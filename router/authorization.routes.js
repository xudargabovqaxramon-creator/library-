const {Router} = require("express")
const { Registr, Login } = require("../controller/user.controller")
const UsersRouter= Router()


UsersRouter.post("/registr",Registr)
UsersRouter.post("/login",Login)

module.exports = UsersRouter