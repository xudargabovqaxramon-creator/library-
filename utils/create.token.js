const jwt = require("jsonwebtoken")

const tokenGenerete = (payload) =>{
    return jwt.sign(payload,process.env.SECRETKY,{expiresIn : "1d"})
}


module.exports = tokenGenerete