
const { Schema, model } = require("mongoose");

const Citation = new Schema(
  {
    sitata: {
      type: String,
      required: false
    },
    user_id: {
      type: Schema.ObjectId,
      ref: "Auth",
      required: true
    },
    book_id: {
        type: Schema.ObjectId,
        ref: "Book",
        required: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Citationschema = model("Citation", Citation);

module.exports = Citationschema;