const {Router} = require("express")
const { getAll_books, add_book, get_one_book, update_book, delet_book } = require("../controller/book.controller")
const bookValidationMiddleware = require("../middleware/book.validation.middleware")


const bookRouter = Router()

bookRouter.get("/get_all_books", getAll_books)
bookRouter.post("/add_book" , bookValidationMiddleware,add_book)
bookRouter.get("/get_one_book/:id", get_one_book)
bookRouter.put("/update_book/:id" ,update_book)
bookRouter.delete("/delete_book/:id", delet_book)


module.exports = bookRouter