const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

var port = process.env.PORT || 5000 
const app = express() 
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})