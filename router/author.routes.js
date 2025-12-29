const {Router} = require("express")
const { getAllAuthors, add_author, get_one_Author, update_Author, delet_author, search,  } = require("../controller/author.controller")
const authorValidationMiddleware = require("../middleware/author.validation.middleware")
const authorization = require("../middleware/authorization")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.get("/search", search)
authorRouter.post("/add_authors",authorValidationMiddleware,authorization, add_author)
authorRouter.get("/get_one_author/:id", get_one_Author)
authorRouter.put("/update_author/:id" ,update_Author)
authorRouter.delete("/delete_author/:id", delet_author)


module.exports = authorRouter