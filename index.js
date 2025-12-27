const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
const errorMiddleware = require("./middleware/error.middleware")
const AuthRouter = require("./router/auth.routes")
require("dotenv").config()


const l_app = express()

const PORT = process.env.PORT || 3000
l_app.use(cors())
l_app.use(express.json())

connectDB()

// Router

l_app.use(authorRouter)
l_app.use(bookRouter)
l_app.use(AuthRouter)


l_app.use(errorMiddleware)

l_app.listen(PORT , () => {
    console.log("server is running " +PORT);
    
}) 