const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    fatherPhoneNo: {
        type: String,
        required: true
    },
    motherName: {
        type: String,
        required: true
    },
    motherPhoneNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    registrationDate: {
        type: String,
        required: true
    },
    familyId: {
        type: String,
        required: true
    },
})

userSchema.pre('save', function(next) { 
    const user = this
    if(!user.isModified('password')){
        return next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return next(err) 
        }
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err){
              return next(err)
            }
            user.password = hash
            next()
        })
    })
})



userSchema.methods.comparePassword = function comparePassword(userPassword){
    // user password is the password the user is trying to login with
    const user = this   // existing user....user.password will be the existing password that has been saved in the db

    return new Promise ((resolve, reject) => {
        bcrypt.compare(userPassword, this.password, (err, isMatch) => {
            if (err){
                return reject(err)
            }
            if(!isMatch){
                return reject(false)
            }
            if(isMatch){
                return resolve(true)
            }
            
        })
    })
}

mongoose.model('User', userSchema)