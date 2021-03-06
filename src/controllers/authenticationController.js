const express = require("express");
const router = express.Router();
const authHandlers = require('../handlers/services/authenticationHandler')

router.post('/create-user', async(req, res) => {
    const response = await authHandlers.createUser(req)
    console.log({response})
    return res.send(response)
})

router.post('/login', async(req, res) => {
    const response = await authHandlers.login(req)
    console.log({response})
    return res.send(response)
})

router.post('/send-otp', async(req, res) => {
    const response = await authHandlers.sendOtp(req)
    console.log({response})
    return res.send(response)
})

router.post('/change-password', async(req, res) => {
    const response = await authHandlers.changePassword(req)
    console.log({response})
    return res.send(response)
})

module.exports = router;