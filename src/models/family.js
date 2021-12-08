const mongoose = require('mongoose')

const familySchema = new mongoose.Schema({
    familyName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    homeTown: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
})

mongoose.model('Family', familySchema)