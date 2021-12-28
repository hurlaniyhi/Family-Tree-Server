const dotenv = require('dotenv').config()

module.exports = {
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASSWORD,
    dBConnectionString: process.env.DB_CONNECTION_STRING,
    secretKey: process.env.TOKEN_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    otpMailContent: process.env.OTP_MAIL_CONTENT
}