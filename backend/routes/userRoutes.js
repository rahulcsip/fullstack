const express = require("express");
const { registerUser,loginUser } = require("../controler/userControlerr");

const router = express.Router()

 router.route('/').post(registerUser)
router.post('/login',loginUser)



module.exports = router;