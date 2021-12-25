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
const fetchFamilies = async(req, res) => {

}

module.exports = {
    createFamily,
    fetchFamilies
}