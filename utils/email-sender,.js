const nodemailer = require("nodemailer")
const CustomErrorHandler = require("./custom-error-handler")

module.exports = async function(code, email) {
    try {
        const transporter =nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: "xudargabovqaxramon@gmail.com",
                pass:process.env.APP_KY
            }
        })

        await transporter.sendMail({
            from:"xudargabovqaxramon@gmail.com",
            to:email,
            subject: "Library verification",
            text: "Ushbu xabarda tasdiqlash kodi berilgan",
            html: `<b style="color:blue; font-size:20px;">${code}</b>`
        })
    } catch (error) {
        throw CustomErrorHandler.BadRequest(error.message) 
    }
}