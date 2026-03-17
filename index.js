const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
const errorMiddleware = require("./middleware/error.middleware")
const AuthRouter = require("./router/auth.routes")
require("dotenv").config()
const cookieparser= require("cookie-parser")
const CitationRouter = require("./router/citation.routes")


const l_app = express()

const PORT = process.env.PORT || 3000
l_app.use(cors())
l_app.use(express.json())
l_app.use(cookieparser())

connectDB()

// Router

l_app.use(authorRouter)
l_app.use(bookRouter)
l_app.use(AuthRouter)
l_app.use(CitationRouter)


l_app.use(errorMiddleware)

const port = process.env.PORT || 10000;
l_app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});