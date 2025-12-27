const { number } = require("joi");
const { Schema, model } = require("mongoose");

const Auth = new Schema(
  {
    user_name: {
        type:String,
        required: [true, "Royxatdan o'tish uchun ism kiriting"],
        trim: true,
        unique:true,
        minlength:[3, "Kamida 3 ta harf kiriting"],
        match: [/^[a-zA-Z0-9]+$/, "Faqat harf va raqam kiriting"]
    },
     email: {
        type:String,
        required: [true, "email kiritish majburiy"],
        trim: true,
        unique:true,
        minlength: [15, "15 ta belgidan iborat bolsin"],
        maxlength: 50
    },
     password: {
        type:String,
        trim: true,
        required: [true, "password kiritish majburiy"],
        minlength: [8, "8 ta belgidan iborat bolsin"]
    },
     role: {
        type:String,
        trim: true,
        lowercase:true,
        enum:{
          values: ["superadmin", "admin", "user"],
          message:`{VALUE} bunday qiymat qabul qilinmaydi`
        },
        default: "user"
    },
     otp: {
        type:String,
        default:null,

    },
    isVerified: {
        type:Boolean,
        default:false,
        
    },
    otpTime: {
        type:Number,
        default:null,
        
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthSchema = model("Auth", Auth);

module.exports = AuthSchema;
