const familyQueries = require('../queries/familyQueries')
const utility = require('../../providers/utility/utility')

const createFamily = async(req) => {
    var { familyName, homeTown, country, state } = req.body

    if(!familyName || !homeTown || !country || !state){
        return {responseCode: "400", responseDescription: "Kindly provide all required information"}
    }

    familyName = utility.capitalizer(familyName)
    homeTown = utility.capitalizer(homeTown)
    country = utility.capitalizer(country)
    state = utility.capitalizer(state)

    const reqData = { familyName, homeTown, country, state }

    try{
        const response = await familyQueries.createFamilyQuery(reqData)
        console.log({createFamilyResponse: response})
        return response
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from create family handler`}
    }
    
}
const searchFamily = async (req) => {
    var { phoneNumber, familyName, country, state, homeTown, userName, searchType } = req.body
    var response;

    try{
        if(!searchType){
            return { responseCode: "25", responseDescription: "Kindly provide search type" }
        }
    
        if(searchType === '1'){
            if(!phoneNumber){
                return { responseCode: "25", responseDescription: "Kindly provide the phoneNumber to search with" }
            }
            response =  await familyQueries.searchFamilyByPhoneNumber(phoneNumber)
            return response
        }
        if(searchType === '2'){
            if(!familyName || !country || !state || !homeTown){
                return { responseCode: "25", responseDescription: "Kindly provide required information for creating a family" }
            }
            familyName = utility.capitalizer(familyName)
            homeTown = utility.capitalizer(homeTown)
            state = utility.capitalizer(state)
            country = utility.capitalizer(country)
            var queryData = { familyName, homeTown, country, state }
            response = await familyQueries.searchFamilyByFamilyDetails(queryData)
            return response
        }
        if(searchType === '3'){
            if(!familyName){
                return { responseCode: "25", responseDescription: "Kindly provide required a family name to search for" }
            }
            familyName = utility.capitalizer(familyName)
            response = await familyQueries.searchByFamilyName_homeTown(familyName)
            return response
        }
        if(searchType === '4'){
            if(!userName){
                return { responseCode: "25", responseDescription: "Kindly provide a name to search" }
            }
            response =  await familyQueries.searchUserFamilyByUsername(userName)
            return response
        }
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from search family handler`}
    }
}

module.exports = {
    createFamily,
    searchFamily
}