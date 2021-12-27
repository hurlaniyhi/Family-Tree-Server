const mongoose = require("mongoose");
const Family = mongoose.model("Family");
const User = mongoose.model("User");
const userQueries = require("../queries/authenticationQueries")
const utility = require('../../providers/utility/utility')

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

  try{
    const searchedFamilies = await Family.find({$or:[{familyName, country, state},{homeTown, country, state}]})
    if(!searchedFamilies.length){
      return {responseCode: '59', responseDescription: 'No Family found'}
    }

   const response = await getFamilyMembers(searchedFamilies)
   return response
  }
  catch(err){
    return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from search family by family details query`}
  }
}

const searchByFamilyName_homeTown = async (familyName) => {
  try{
    const searchedFamilies = await Family.find({$or:[{familyName},{homeTown: familyName}]})
    if(!searchedFamilies.length){
      return {responseCode: '59', responseDescription: 'No Family found'}
    }

    const response = await getFamilyMembers(searchedFamilies)
    return response
  }
  catch(err){
    return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from search family by familyName or homeTown query`}
  }
}

const searchUserFamilyByUsername = async (username) => {
  try{
    username = utility.trimString(username)
    var usersData = []
    var nameToArray = username.split(" ")
    
    if(nameToArray.length > 1){
      var [firstName, lastName] = nameToArray
      firstName = utility.capitalizer(firstName)
      lastName = utility.capitalizer(lastName)

      var users = await User.find({$or:[{firstName, lastName},{firstName: lastName, lastName: firstName}]})
      if(!users.length){
        return {responseCode: '59', responseDescription: 'No User found'}
      }
    }
    else{
      username = utility.capitalizer(username)
      var users = await User.find({$or:[{firstName: username}, {lastName: username}]})
      console.log({user: users})
      if(!users.length){
        return {responseCode: '59', responseDescription: 'No User found'}
      }
    }

    for(let user of users){
      const resp = await userQueries.getUserOtherDetails(user)
      const userData = {
        userData: user, familyData: resp.familyData, familyMembers: resp.familyMembers
      }
      usersData.push(userData)
    }
    //console.log({usersData})
    return { responseCode: "00", responseDescription: "Success", data: usersData }
  }
  catch(err){
    return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from search User by searchUserFamilyByUserName query`}
  }
}

async function getFamilyMembers(families){
  var familiesData = []

  try{
    for(let family of families){
      const members = await User.find({familyId: family._id})
      var familyDetail = {
        _id: family._id, familyName: family.familyName, state: family.state, 
        homeTown: family.homeTown, country: family.country, familyMembers: members
      }

      familiesData.push(familyDetail)
    }

    //console.log({familiesData})
    return { responseCode: "00", responseDescription: "Success", data: {familiesData} }
  }
  catch(err){
    return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from get family members method`}
  }
}

module.exports = {
    createFamilyQuery,
    searchFamilyByPhoneNumber,
    searchFamilyByFamilyDetails,
    searchByFamilyName_homeTown,
    searchUserFamilyByUsername 
}