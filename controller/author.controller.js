const AuthorSchema = require("../schema/author.schema");
const bookSchema = require("../schema/book.schema");
const CustomErrorHandler = require("../utils/custom-error-handler");

const getAllAuthors = async (req, res, next) => {
try {
    const authors = await AuthorSchema.find()

    res.status(200).json(authors)
} catch (error) {
     next(error)
    
}
}



const search = async (req, res, next) => {
try {
    const  {name} = req.query
    const searchingRes = await AuthorSchema.find({
        full_name: {$regex:name}
    })

    res.status(200).json(searchingRes)
} catch (error) {
     next(error)
    
}
}



const add_author = async (req, res, next) => {
try {
    const {full_name,  birth_year, death_year, bio, creativity,genre, period, image_url, region} = req.body

    await AuthorSchema.create({full_name,  birth_year, death_year, bio, creativity,genre, period, image_url, region})

    res.status(201).json({
        message: "Added author"
    })
} catch (error) {
     next(error)
    
}}




const get_one_Author = async (req, res, next) => {
try {
    const {id} = req.params
    const author = await AuthorSchema.findById(id)

    if (!author) {
        throw CustomErrorHandler.NotFound("Author not found")
    }

    const foundedBooks = await bookSchema.find({author_id:id}).select("title pages -_id")

    res.status(200).json({author, foundedBooks})
} catch (error) {
     next(error)
    
}}



const update_Author = async (req, res, next) => {
try {
    const {id} = req.params
     const {full_name,  birth_year, death_year, bio, creativity,genre, period, image_url, region} = req.body
    const author = await AuthorSchema.findById(id)

    if (!author) {
         throw CustomErrorHandler.NotFound("Author not found")
    }
    await AuthorSchema.findByIdAndUpdate(id,
        {full_name,  birth_year, death_year, bio, creativity,genre, period, image_url, region}
    )

    res.status(200).json({
        message : "Author updated"
    })
} catch (error) {
     next(error)
    
}}






const  delet_author= async (req, res) => {
try {
    const {id} = req.params
    const author = await AuthorSchema.findById(id)

    if (!author) {
         throw CustomErrorHandler.NotFound("Author not found")
    }
    await AuthorSchema.findByIdAndDelete(id)

    res.status(200).json({
        message : "Author deleted"
    })
} catch (error) {
     next(error)
    
}}




module.exports = {
    getAllAuthors,
    add_author,
    get_one_Author,
    update_Author,
    delet_author,
    search
}