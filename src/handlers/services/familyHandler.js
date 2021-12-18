const familyQueries = require('../queries/familyQueries')

const createFamily = async(req) => {
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