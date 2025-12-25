const { Schema, model } = require("mongoose");

const userschema = new Schema(
  {
    user_name: {
        type:String,
        required: [true, "Royxatdan o'tish uchun ism kiriting"],
        trim: true,
        unique:true
    },
     email: {
        type:String,
        required: [true, "email kiritish majburiy"],
        trim: true,
        unique:true,
        minlength: 3,
        maxlength: 50
    },
     password: {
        type:String,
        trim: true,
        required: [true, "password kiritish majburiy"],
        minlength: 6
    },
     role: {
        type:String,
        trim: true,
        enum:["admin","user"],
        default: "user"
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserSchema = model("user", userschema);

module.exports = UserSchema;
