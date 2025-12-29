const {Router} = require("express")
const { register, Login, verify, logout } = require("../controller/auth.controller")
const refreshToken = require("../middleware/refresh-token")
const AuthRouter= Router()


AuthRouter.post("/registr",register)
AuthRouter.post("/login",Login)
AuthRouter.post("/verify",verify)
AuthRouter.get("/refresh",refreshToken)
AuthRouter.get("logout", logout)

module.exports = AuthRouter