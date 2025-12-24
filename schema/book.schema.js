const { ref, required } = require("joi");
const { Schema, model } = require("mongoose");

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Kitob nomi majburiy"],
      unique: true,
      trim: true,
      minlength: [2, "title kamida 2 ta belgidan iborat bo'lsin"],
      maxlength: [150, "title 150 belgidan oshmasin"],
    },

    pages: {
      type: Number,
      required: [true, "Sahifalar soni majburiy"],
      min: [1, "Kamida 1 sahifa bo'lishi kerak"],
      max: [10000, "Sahifalar soni juda katta"],
    },

    published_year: {
      type: Number,
      default: null,
      min: [1000, "Yil noto'g'ri"],
      max: [new Date().getFullYear(), "Kelajak yili bo'lishi mumkin emas"],
    },

    image_url: {
      type: String,
      required: [true, "Rasm URL majburiy"],
    },

    description: {
      type: String,
      required: [true, "description majburiy"],
      minlength: [10, "description kamida 10 ta belgidan iborat bo'lsin"],
      maxlength: [1000, "description 1000 belgidan oshmasin"],
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
          "thriller",
          "adventure",
          "novel",
          "poetry",
          "action",
        ],
        message: "{VALUE} bunday genre mavjud emas",
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
        message: `{VALUE} bunday davr mavjud emas`,
      },
    },

    published_home: {
      type: String,
      required: [true, "Nashriyot majburiy"],
      trim: true,
      minlength: [2, "Nashriyot nomi juda qisqa"],
    },
    author_id : {
        type: Schema.ObjectId,
        ref:"Author",
        required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Book", BookSchema);
