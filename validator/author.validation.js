const Joi = require("joi")

exports.AuthorValidator = function(data) {
    try {
        const schema = Joi.object({
            full_name: Joi.string.pattern(new RegExp('^[a-zA-Z{3,50}]')).required(),
            birth_year: Joi.number.integer().required(),
            death_year: Joi.string.required(),
            image_url: Joi.string.required(),
            genre: Joi.string.valid("historical",
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
            bio: Joi.string.max(10000).required(),
            period: Joi.string.valid("Temuriylar davri",
          "Jadid adabiyoti",
          "Sovet davri",
          "Mustaqillik davri",).required(),
            creativity: Joi.string.max(1000).required(),
            region: Joi.string.max(50).required()
        })
        return schema.validate(data)
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}