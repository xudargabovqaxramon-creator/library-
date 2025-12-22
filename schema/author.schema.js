const { Schema, model } = require("mongoose");

const Author = new Schema({
    full_name: {
        type : String,
        required: [true, "Ism/familiya kiritish majburiy"],
        unique: true,
        trim: true,
        maxlength: [60, "Faqat 60 ta harfga mumkin"],
        minlength: [5, "Kamida 5 ta harfdan iborat bolishi kerak"],
        match: [/^[a-zA-Z]+$/ , "Faqat harf kiriting"]
    },
     birth_year: {
        type : Number,
        required: true,
        max: [new Date().getFullYear()-15, "Adib kamida 15-16 yosh bolishi kerak"],
        min: [0, "Miloddan avvalgi yilllar olinmaydi"]
    },
     death_year: {
        type : String,
        required: false,
        default:null,
        max: new Date().getFullYear()-15
    },
     image_url: {
        type : String,
        required: true,
         minlength: [5, "Kamida 5 ta harfdan iborat bolishi kerak"]
    },
     bio: {
        type : String,
        required: true,
        maxlength: [200, "Faqat 200 ta harfga mumkin"],
        minlength: [20, "Bio kamida 20 ta harfdan iborat bo'lsin"]
    }, 
     genre : {
        type : String,
        required: true
    },
     period: {
        type : String,
        required: true
    },
    creativty: {
        type : String,
        required: true,
        minlength: 3
    },
     region: {
        type : String,
        required: true
    }
},{
    versionKey: false,
    timestamps: true
})

const AuthorSchema = model("Author", Author)

module.exports = AuthorSchema