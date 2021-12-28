const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const { emailUser, emailPass, otpMailContent } = require('../../config/constant')

function connectToDatabase(connectionString){
    const mongoUri = connectionString

    mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true
    })

    mongoose.connection.on('connected', () => {
        console.log("connected to mongodb cloud")
    })

    mongoose.connection.on('error', (err) => {
        console.error("Error connecting to mongodb cloud", err)
    })
}

async function sendMail(receiver){
    var response;
    var otp = Math.floor(100000 + Math.random() * 900000)
    try{
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com", 
            port: 465,
            secure: true,
             auth: {
               user: emailUser,
               pass: emailPass
             },
           });
         
        let mailOptions = {
            from: `"Family Tree App" <newcoretechnologies@gmail.com>`, 
            to: receiver, 
            subject: "Account Verification", 
            text: "",
            html: `<div>
                    <p>${otpMailContent}</p>
                    <p style="margin-bottom: 20px">Otp: <strong>${otp}</strong></p>
                    <p>Thank you.</p>
                </div>`
        };
        
        await transporter.sendMail(mailOptions)
            .then(info => {
                console.log("Message sent: %s", info.messageId);
                response = {responseCode: "00", responseDescription: "mail successfully sent"}
            })
            .catch(error => {
                console.log(error)
                response = {responseCode: "25", responseDescription: "Error occur while sending message", error}
            })      
        return response
    }
    catch(err){
        return {responseCode: "101", responseDescription: "Something went wrong", exception: `${err} : from sendMail method`}
    }
}

module.exports = {
    connectToDatabase,
    sendMail
}