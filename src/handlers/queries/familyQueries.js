const mongoose = require("mongoose");
const Family = mongoose.model("Family");

const createFamilyQuery = async(data) => {
    const {familyName, homeTown, country, state} = data;

    try{
        const family = new Family({
            familyName,
            homeTown,
            country,
            state
        })
    
       await family.save()

       if(family){
            return {responseCode: '00', responseDescription: 'Family successfully created', data: family}
       }
       else{
            return { responseCode: '25', responseDescription: 'Information could not be saved. Kindly try later', exception: `${family} : from create family query`}
       }
       
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from create family query`}
    }
}

module.exports = {
    createFamilyQuery
}