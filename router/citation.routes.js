const { Router } = require("express")
const { addcitation, updatecitation, deletecitation } = require("../controller/citation.controller")
const CitationRouter = Router()

CitationRouter.post("/add_citation", addcitation)
CitationRouter.put("/update_citation/:id", updatecitation)
CitationRouter.delete("/delete_citation/:id", deletecitation)

module.exports = CitationRouter