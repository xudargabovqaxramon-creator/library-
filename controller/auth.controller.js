const AuthSchema = require("../schema/auth.schema")
const CustomErrorHandler = require("../utils/custom-error-handler")
const bcrypt = require("bcryptjs")
const emailSender = require("../utils/email-sender,")
const accessToken = require("../utils/create.token")
const register = async (req, res, next) => {
try {
    const {user_name, email, password} = req.body

    const foundeduser = await AuthSchema.findOne({email})

    if (foundeduser) {
      throw CustomErrorHandler.UnAuthorized(" User already exists")
    }

    const hashPassword = await bcrypt.hash(password, 12)

    const randomNumbers = Array.from({length:6}, () => Math.floor(Math.random() * 10)).join("")
  
    const time = Date.now() +120000
    
    await AuthSchema.create({
      user_name,
      email,
      password:hashPassword,
      otp :randomNumbers,
      otpTime:time
    })
    
    await emailSender(randomNumbers, email)

    res.status(201).json({
      message : "registerd!"
    })

} catch (error) {
     next(error)
    
}}



const verify = async (req, res, next) => {
try {
    const { email, otp} = req.body

    const foundeduser = await AuthSchema.findOne({email})

    if (!foundeduser) {
      throw CustomErrorHandler.NotFound(" user not found")
    }

    const time = Date.now()

    
    if (foundeduser.otpTime < time) {
      throw CustomErrorHandler.BadRequest("otp time expired")
    }


    
    if (foundeduser.otp !== otp) {
      throw CustomErrorHandler.BadRequest("Wrong otp")
    }


    await AuthSchema.findByIdAndUpdate(foundeduser._id, {isVerified:true, otpTime:null, otp:null})

    const payload ={
      user_name:foundeduser.user_name,
      email:foundeduser.email,
      role:foundeduser.role,
      id: foundeduser._id
    }

    const access_token = accessToken(payload)

    res.status(200).json({
      message: "Success",
      access_token
    })

} catch (error) {
     next(error)
    
}}


const Login = async (req, res, next) => {
try {
    
} catch (error) {
     next(error)
    
}}

module.exports = {
  register,
  Login,
  verify
}