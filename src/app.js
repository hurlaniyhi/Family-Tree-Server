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

helpers.connectToDatabase(dBConnectionString)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})