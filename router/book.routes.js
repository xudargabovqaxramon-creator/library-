const {Router} = require("express")
const { getAll_books, add_book, get_one_book, update_book, delet_book } = require("../controller/book.controller")
const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")
const bookValidationMiddleware = require("../middleware/book.validation.middleware")


const bookRouter = Router()

bookRouter.get("/get_all_books",auth, getAll_books)
bookRouter.post("/add_book", auth ,role("admin"), bookValidationMiddleware,add_book)
bookRouter.get("/get_one_book/:id",auth, get_one_book)
bookRouter.put("/update_book/:id",auth ,role("admin"),update_book)
bookRouter.delete("/delete_book/:id",auth,role("admin"), delet_book)


module.exports = bookRouter