require("./models/family")
require("./models/users")
const helpers = require('./providers/others/helpers')
const {dBConnectionString} = require('./config/constant')
const familyController = require("./controllers/familyController")
const authenticationController = require("./controllers/authenticationController")
const express = require('express')
const bodyParser = require('body-parser')
var port = process.env.PORT || 5000 
const app = express() 

app.use(bodyParser.json())
app.use("/auth/", authenticationController)
app.use("/family/", familyController)

helpers.connectToDatabase(dBConnectionString)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})