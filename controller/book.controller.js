const BookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

const getAll_books = async (req, res, next) => {
try {
    const books = await BookSchema.find().populate("author_id","_id")

    res.status(200).json(books)
} catch (error) {
     next(error)
  
}
}


const add_book = async (req, res, next) => {
try {
    const {title,  pages, published_year, description, published_home,genre, period, image_url,author_id} = req.body

    await BookSchema.create({title,  pages, published_year, description, published_home,genre, period, image_url,author_id})

    res.status(201).json({
        message: "Added book "
    })
} catch (error) {
     next(error)
    
}}




const get_one_book = async (req, res, next) => {
try {
    const {id} = req.params
    const book = await BookSchema.findById(id)

    if (!book) {
        throw CustomErrorHandler.NotFound("Book Not Found")
    }

    res.status(200).json(book)
} catch (error) {
     next(error)
    
}}



const update_book = async (req, res, next) => {
try {
    const {id} = req.params
     const {title,  pages, published_year, description, published_home,author_id,genre, period, image_url} = req.body
    const book = await BookSchema.findById(id)

    if (!book) {
         throw CustomErrorHandler.NotFound("Book Not Found")
    }
    await BookSchema.findByIdAndUpdate(id,
        {title,  pages, published_year, description, published_home,genre,author_id, period, image_url}
    )

    res.status(200).json({
        message : "book updated"
    })
} catch (error) {
     next(error)
    
}}






const  delet_book= async (req, res, next) => {
try {
    const {id} = req.params
    const book = await BookSchema.findById(id)

    if (!book) {
        throw CustomErrorHandler.NotFound("Book Not Found")
    }
    await BookSchema.findByIdAndDelete(id)

    res.status(200).json({
        message : "book deleted"
    })
} catch (error) {
     next(error)
    
}}




module.exports = {
    getAll_books,
    add_book,
    get_one_book,
    update_book,
    delet_book
}