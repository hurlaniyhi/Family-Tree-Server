require("./models/family")
const helpers = require('./providers/others/helpers')
const {dBConnectionString} = require('./config/constant')
const familyController = require("./controllers/familyController")
const express = require('express')
const bodyParser = require('body-parser')
var port = process.env.PORT || 5000 
const app = express() 

app.use(bodyParser.json())
app.use("/", familyController)

// app.get("/multiply-two-numbers", (req,res) => {
//     // console.log(req.query.name)
//     // return res.send(`my name is ${req.query.name} my class is ${req.query.class}`)
//     try{
//         const {firstNumber, secondNumber} = req.body
//         if(!req.body.firstNumber || !req.body.secondNumber){
//             return res.send("Kindly provide all required information")
//         }
//         let a = req.body.firstNumber
//         let b = req.body.secondNumber
    
//         return res.send({multiplicationAnswer: a*b})
//     }
//     catch(err){
//         return res.send({message: "Something went wrong", error: err})
//     }
// })

helpers.connectToDatabase(dBConnectionString)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})