const dotenv = require('dotenv').config()

module.exports = {
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS,
    dBConnectionString: process.env.DB_CONNECTION_STRING
}