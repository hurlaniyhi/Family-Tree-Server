const mongoose = require("mongoose");
const User = mongoose.model("User");
const Family = mongoose.model("Family");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const  { secretKey } = require("../../config/constant")

const createUserQuery = async (data) => {
    var result;

    try{
        const userExistence = await User.findOne({phoneNumber: data.phoneNumber})
        if(userExistence){
            return { responseCode: "59", responseDescription: "User already exists with this data" }
        }

        const user = new User(data)
        await user.save()
        .then( async doc => {
            const token = jwt.sign({userId: doc._id}, secretKey)
            const otherData = await getUserOtherDetails(doc)
            result = { 
                responseCode: "00", responseDescription: "User successfully created", 
                data: { userData: doc, familyMembers: otherData.familyMembers, familyData: otherData.familyData }, token 
            }
        })
        .catch(err => {
            result = { responseCode: '25', responseDescription: 'Information could not be saved. Kindly try later', exception: `${err} : from create user query` }
        })

        return result
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from create user query`}
    }
}

const loginQuery = async (data) => {
    const user = await User.findOne({phoneNumber: data.phoneNumber})
    
    if(!user){
        return { responseCode: "25", responseDescription: "Invalid username or password" }
    }

    try{
        await user.comparePassword(data.password)
        const token = jwt.sign({userId: user._id}, secretKey)
        const otherData = await getUserOtherDetails(user)

        return {
            responseCode: "00", responseDescription: "Successfully logged in", token, 
            data: { userData: user, familyMembers: otherData.familyMembers, familyData: otherData.familyData }
        }
    }           
    catch(err){
        return { responseCode: "101", responseDescription: "Invalid username or password", exception: `${err} : from login query`}
    }  
}

const getUserOtherDetails = async (data) => {
    var result = {}

    const familyMembers = await User.find({familyId: data.familyId})
    result.familyMembers = familyMembers.length > 0 ? familyMembers : "No family members could be found"

    const familyData = await Family.findById(data.familyId)
    result.familyData = !familyData ? "No family data could be found" : familyData

    return result
}

const checkUserWithEmail = async (email) => {
    try{
        const user = await User.findOne({email})
        if(!user){
            return { responseCode: "25", responseDescription: "No user found with this email address" }
        }
        return user
    }
    catch(err){
        return { responseCode: "101", responseDescription: "Something went wrong", exception: `${err} : from checkUserWithEmail query`}
    }
}

const changePasswordQuery = async (data) => {
    var response;
    try{
        const user = await User.findOne({phoneNumber: data.phoneNumber, email: data.email})
        if(!user){
            return({responseCode: "25", responseDescription: "User is not found"})
        }
        
        // await bcrypt.genSalt(10, async (err, salt) => {
        //     await bcrypt.hash(data.password, salt, async (err, hash)=>{
        //         console.log(hash)
        //         const newpassword = hash
        //         await User.findByIdAndUpdate({_id: user._id}, {     
        //             $set: {
        //                 password: newpassword
        //             }
        //         })
        //         .then(doc => {
        //             console.log({message:"successfully updated", user: doc})
        //             response = {responseCode: "00", responseDescription: "success"}
        //         })
        //         .catch(err => {
        //             console.log("error occured during update")
        //             response = {responseCode: "59", responseDescription: "error occured while changing password", error: err}
        //         })
        //     })
        // })

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password, salt)
        console.log(hash)
        const response = await User.findByIdAndUpdate({_id: user._id}, {     
                        $set: {
                            password: hash
                        }
                    })

        console.log({myResponse: response})
        return response;
    }
    catch(err){
        return { responseCode: "101", responseDescription: "Something went wrong", exception: `${err} : from checkPasswordQuery query`}
    }
}

module.exports = {
    createUserQuery,
    loginQuery,
    getUserOtherDetails,
    checkUserWithEmail,
    changePasswordQuery
}