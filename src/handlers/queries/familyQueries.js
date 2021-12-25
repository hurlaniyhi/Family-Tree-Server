const mongoose = require("mongoose");
const Family = mongoose.model("Family");

const createFamilyQuery = async (data) => {
    const {familyName, homeTown, country, state} = data;
    var result;

    const checkExistence = await Family.findOne({familyName, homeTown, country, state})
    console.log({checkExistence: checkExistence})
    if(checkExistence){
      return { responseCode: "59", responseDescription: "Family already exists with this data", familyData: checkExistence }
    }
    
    try{
        const family = new Family({
          familyName,
          homeTown,
          country,
          state
        })
    
      await family.save()
      .then(doc => {
        result = {responseCode: '00', responseDescription: 'Family successfully created', data: doc}
      })
      .catch(err => {
        result = { responseCode: '25', responseDescription: 'Information could not be saved. Kindly try later', exception: `${err} : from create family query`}
      })
      
     return result;
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from create family query`}
    }
}

module.exports = {
    createFamilyQuery
}