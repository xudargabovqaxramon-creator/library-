const {Router} = require("express")
const { getAllAuthors, add_author, get_one_Author, update_Author, delet_author, search,  } = require("../controller/author.controller")
const auth = require("../middleware/auth.middleware")
const role = require("../middleware/role.middleware")

const authorRouter = Router()

authorRouter.get("/get_all_authors",auth, getAllAuthors)
authorRouter.get("/search",auth, search)
authorRouter.post("/add_authors",auth,role("admin"), add_author)
authorRouter.get("/get_one_author/:id",auth, get_one_Author)
authorRouter.put("/update_author/:id", auth,role("admin") ,update_Author)
authorRouter.delete("/delete_author/:id",auth,role("admin"), delet_author)


module.exports = authorRouter