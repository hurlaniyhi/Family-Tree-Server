const familyQueries = require('../queries/familyQueries')

const createFamily = async(req) => {
    const {familyName, homeTown, country, state} = req.body
    if(!familyName || !homeTown || !country || !state){
        return {responseCode: "400", responseDescription: "Kindly provide all required information"}
    }

    try{
        const response = await familyQueries.createFamilyQuery(req.body)
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