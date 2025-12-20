const {Router} = require("express")
const { getAllAuthors, add_author, get_one_Author, update_Author, delet_author,  } = require("../controller/author.controller")

const authorRouter = Router()

authorRouter.get("/get_all_authors", getAllAuthors)
authorRouter.post("/add_authors", add_author)
authorRouter.get("/get_one_author/:id", get_one_Author)
authorRouter.put("/update_author/:id", update_Author)
authorRouter.delete("/delete_author/:id", delet_author)


module.exports = authorRouter