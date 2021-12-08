const { createFamilyQuery } = require('../queries/familyQueries')
const mongoose = require("mongoose");
const Family = mongoose.model("Family");

exports.createFamily = async(req, res) => {
    try{
       const response = await createFamilyQuery(req.body)
        return response
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from create family handler`}
    }
    
}