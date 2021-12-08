const express = require("express");
//const requireAuth = require("../middlewares/requireAuth");
const router = express.Router();
const {createFamily} = require('../handlers/services/familyHandler')

router.post('/create-family', async(req,res) => {
    const response = await createFamily(req, res)
    console.log({response})
    return res.send(response)
})

module.exports = router;