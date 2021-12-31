var utility = require("../../providers/utility/utility")
var userQueries = require("../queries/authenticationQueries")
const helpers = require('../../providers/others/helpers')

const createUser = async (req) => {
    var {
        firstName, lastName, email, password, phoneNumber, fatherName, familyId,
        fatherPhoneNo, motherName, motherPhoneNo, address, dateOfBirth, gender
    } = req.body

    try{
        if(
            !firstName || !lastName, !email || !password || !fatherPhoneNo || !motherPhoneNo
            || !fatherName || !motherName || !address || !dateOfBirth || !gender || !phoneNumber || !familyId
        ){
            return { responseCode: "400", responseDescription: "Kindly provide all required information" }
        }

        firstName = utility.spaceRemover(utility.capitalizer(firstName))
        lastName = utility.spaceRemover(utility.capitalizer(lastName))
        email = utility.spaceRemover(email)
        let registrationDate = `${new Date().getDate()}/${new Date().getMonth()+1}/${new Date().getFullYear()}`

        const userData = {
            firstName, lastName, email, password, fatherPhoneNo, motherPhoneNo, registrationDate,
            motherName, fatherName, address, gender, phoneNumber, dateOfBirth, familyId
        }

        const response = await userQueries.createUserQuery(userData)
        return response

    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from create user handler`}
    }
}

const login = async (req) => {
    var { phoneNumber, password } = req.body

    try{
        if(!phoneNumber || !password){
            return { responseCode: "400", responseDescription: "Kindly provide all required information" }
        }

        const response = await userQueries.loginQuery(req.body)
        return response
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from login handler` }
    }
}

const sendOtp = async (req) => {
    var {email, emailType} = req.body
    var response;
    try{
        if(!email || !emailType){
            return { responseCode: "400", responseDescription: "Kindly provide all required information" }
        }

        email = utility.spaceRemover(email)

        if(emailType === "2"){ 
            response = await userQueries.checkUserWithEmail(email)
            if(response.responseCode === "25"){ 
                return response
            }
        }

        response = await helpers.sendMail(email)
        return response
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from sendOtp handler` }
    }
}

const changePassword = async (req) => {
    var {email, password, phoneNumber} = req.body

    try{
        if(!phoneNumber || !password || !email){
            return { responseCode: "400", responseDescription: "Kindly provide all required information" }
        }

        email = utility.spaceRemover(email)
        const response = await userQueries.changePasswordQuery({email, password, phoneNumber})
        return response
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from changePassword handler` }
    }
}

module.exports = {
    createUser,
    login,
    sendOtp,
    changePassword
}