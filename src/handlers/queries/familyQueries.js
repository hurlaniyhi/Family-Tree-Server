const mongoose = require("mongoose");
const Family = mongoose.model("Family");
const User = mongoose.model("User");
const userQueries = require("../queries/authenticationQueries")

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

const searchFamilyByPhoneNumber = async (phoneNumber) => {
  try{
    const searchedUser = await User.findOne({phoneNumber})
    if(!searchedUser){
      return {responseCode: '59', responseDescription: 'No User Found with this phone number'}
    }

    const familyData = await userQueries.getUserOtherDetails(searchedUser)
    return { 
      responseCode: '00', responseDescription: "Success", 
      data: { familyData: familyData.familyData, familyMembers: familyData.familyMembers}
    }
  }
  catch(err){
    return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from search family with phoneNumber query`}
  }
}

const searchFamilyByFamilyDetails = async (req) => {
  const {familyName, homeTown, country, state} = req
  var familiesData = []

  try{
    const searchedFamilies = await Family.find({$or:[{familyName, country, state},{homeTown, country, state}]})
    if(!searchedFamilies.length){
      return {responseCode: '59', responseDescription: 'No Family found'}
    }

    for(let family of searchedFamilies){
      const members = await User.find({familyId: family._id})
      var familyDetail = {
        _id: family._id, familyName: family.familyName, state: family.state, 
        homeTown: family.homeTown, country: family.country, familyMembers: members
      }

      familiesData.push(familyDetail)
    }

    console.log({familiesData})
    return { responseCode: "00", responseDescription: "Success", data: {familiesData} }
  }
  catch(err){

  }
}

module.exports = {
    createFamilyQuery,
    searchFamilyByPhoneNumber,
    searchFamilyByFamilyDetails
}