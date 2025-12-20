const BookSchema = require("../schema/book.schema");

const getAll_books = async (req, res) => {
try {
    const books = await BookSchema.find()

    res.status(200).json(books)
} catch (error) {
    console.log(error.message);
    
}
}


const add_book = async (req, res) => {
try {
    const {title,  pages, published_year, description, published_home,genre, period, image_url} = req.body

    await BookSchema.create({title,  pages, published_year, description, published_home,genre, period, image_url})

    res.status(201).json({
        message: "Added book "
    })
} catch (error) {
    console.log(error.message);
    
}}




const get_one_book = async (req, res) => {
try {
    const {id} = req.params
    const book = await BookSchema.findById(id)

    if (!book) {
        return res.status(404).json({
            message : "book not found"
        })
    }

    res.status(200).json(book)
} catch (error) {
    console.log(error.message);
    
}}



const update_book = async (req, res) => {
try {
    const {id} = req.params
     const {title,  pages, published_year, description, published_home,genre, period, image_url} = req.body
    const book = await BookSchema.findById(id)

    if (!book) {
        return res.status(404).json({
            message : "book not found"
        })
    }
    await BookSchema.findByIdAndUpdate(id,
        {title,  pages, published_year, description, published_home,genre, period, image_url}
    )

    res.status(200).json({
        message : "book updated"
    })
} catch (error) {
    console.log(error.message);
    
}}






const  delet_book= async (req, res) => {
try {
    const {id} = req.params
    const book = await BookSchema.findById(id)

    if (!book) {
        return res.status(404).json({
            message : "book not found"
        })
    }
    await BookSchema.findByIdAndDelete(id)

    res.status(200).json({
        message : "book deleted"
    })
} catch (error) {
    console.log(error.message);
    
}}




module.exports = {
    getAll_books,
    add_book,
    get_one_book,
    update_book,
    delet_book
}