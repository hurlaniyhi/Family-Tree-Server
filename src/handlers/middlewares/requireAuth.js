const jwt = require("jsonwebtoken")
const mongoose = require('mongoose')
const User = mongoose.model('User')
const { secretKey } = require('../../config/constant')


module.exports = (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization){
        return res.send({responseCode: "400", responseDescription: "You must be logged in"})
    }
    else{
        const token = authorization.replace("Bearer ", "")

        jwt.verify(token, secretKey, async(err, payload) => {
            if(err){
                return res.send({responseCode: "400", responseDescription: "You must be logged in"})
            }
            else{
                const {userId} = payload
                const user = await User.findById(userId)
                req.user = user
                next()
            }
        })
    }
}