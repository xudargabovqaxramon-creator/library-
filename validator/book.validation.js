const Joi = require("joi")

exports.BookValidator = function(data) {
    try {
        const schema = Joi.object({
            title: Joi.string.pattern(new RegExp('^[a-zA-Z{2,150}]')).required(),
            pages: Joi.number.min(10).integer().required(),
            published_year: Joi.number.integer().max(new Date().getFullYear()).required(),
            image_url: Joi.string.min(15).required(),
            genre: Joi.string.lowercase().valid("historical",
          "drama",
          "horror",
          "romance",
          "documentary",
          "detective",
          "comedy",
          "fantasy",
          "science fiction",
          "reality",
          "animation",
          "thriller",
          "adventure",
          "novel",
          "poetry",
          "satire",
          "melodrama",
          "action",).required(),
            description: Joi.string.max(10000).required(),
            period: Joi.string.valid("Temuriylar davri",
          "Jadid adabiyoti",
          "Sovet davri",
          "Mustaqillik davri",).required(),
            published_home: Joi.string.min(3).max(100).required(),
            author_id: Joi.string.max(24).required()
        })
        return schema.validate(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}