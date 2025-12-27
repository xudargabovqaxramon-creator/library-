const jwt = require("jsonwebtoken")
const CustomErrorHandler = require("./custom-error-handler")

const accessToken = (payload) =>{
   try {
     return jwt.sign(payload,process.env.SECRETKY,{expiresIn : "15m"})
   } catch (error) {
    throw CustomErrorHandler.BadRequest(error.message)
   }
}


module.exports = accessToken