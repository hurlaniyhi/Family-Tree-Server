var utility = require("../../providers/utility/utility")
var userQueries = require("../queries/authenticationQueries")

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

module.exports = {
    createUser,
    login
}