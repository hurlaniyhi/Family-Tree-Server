const express = require("express");
const requireAuth = require("../handlers/middlewares/requireAuth");
const router = express.Router();
const familyHandlers = require('../handlers/services/familyHandler')

router.post('/create-family', async (req,res) => {
    const response = await familyHandlers.createFamily(req)
    console.log({response})
    return res.send(response)
})

module.exports = router;