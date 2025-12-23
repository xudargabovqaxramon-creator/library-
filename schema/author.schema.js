const { Schema, model } = require("mongoose");

const Author = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "Ism/familiya kiritish majburiy"],
      unique: true,
      trim: true,
      maxlength: [60, "Faqat 60 ta harfga mumkin"],
      minlength: [5, "Kamida 5 ta harfdan iborat bolishi kerak"],
      match: [/^[a-zA-Z\s]+$/, "Faqat harf kiriting"],
    },
    birth_year: {
      type: Number,
      required: true,
      max: [
        new Date().getFullYear() - 15,
        "Adib kamida 15-16 yosh bolishi kerak",
      ],
      min: [1000, "Yil noto'g'ri Faqat 1000 mumkin"],
    },
    death_year: {
      type: Number,
      required: false,
      default: null,
      validate: {
        validator: function (value) {
          return value === null || value >= this.birth_year;
        },
        message: "Vafot yili tug'ilgan yildan kichik bo'lishi mumkin emas",
      },

      max: new Date().getFullYear() - 15,
    },
    image_url: {
      type: String,
      required: true,
      minlength: [5, "Kamida 5 ta harfdan iborat bolishi kerak"],
    },
    bio: {
      type: String,
      required: true,
      maxlength: [600, "Faqat 600 ta harfga mumkin"],
      minlength: [20, "Bio kamida 20 ta harfdan iborat bo'lsin"],
    },
    genre: {
      type: String,
      required: true,
      lowercase: true,
      enum: {
        values: [
          "historical",
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
          "action",
        ],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`,
      },
    },
    period: {
      type: String,
      required: true,
      enum: {
        values: [
          "Temuriylar davri",
          "Jadid adabiyoti",
          "Sovet davri",
          "Mustaqillik davri",
        ],
        message: `{VALUE} bunday qiymat qabul qilinmaydi`,
      },
    },
    creativity: {
      type: String,
      required: true,
      maxlength: [400, "Faqat 400 ta harfga mumkin"],
      minlength: [20, " kamida 20 ta harfdan iborat bo'lsin"],
    },
    region: {
      type: String,
      required: true,
      trim: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthorSchema = model("Author", Author);

module.exports = AuthorSchema;
