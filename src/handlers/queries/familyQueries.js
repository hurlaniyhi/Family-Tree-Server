const mongoose = require("mongoose");
const Family = mongoose.model("Family");

exports.createFamilyQuery = async(data) => {
    const {familyName, homeTown, country, state} = data;

    try{
        const family = new Family({
            familyName,
            homeTown,
            country,
            state
        })
    
        await family.save()
        return {responseCode: '00', responseDescription: 'Family successfully created', data: family}
    }
    catch(err){
        return { responseCode: '101', responseDescription: 'Something went wrong', exception: `${err} : from create family query`}
    }
}