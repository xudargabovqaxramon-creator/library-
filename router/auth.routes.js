const {Router} = require("express")
const { register, Login, verify } = require("../controller/auth.controller")
const AuthRouter= Router()


AuthRouter.post("/registr",register)
AuthRouter.post("/login",Login)
AuthRouter.post("/verify",verify)

module.exports = AuthRouter