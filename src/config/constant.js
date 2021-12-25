const dotenv = require('dotenv').config()

module.exports = {
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASSWORD,
    dBConnectionString: process.env.DB_CONNECTION_STRING,
    secretKey: process.env.TOKEN_KEY,
}