const mongoose = require('mongoose')

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

module.exports = {
    connectToDatabase
}