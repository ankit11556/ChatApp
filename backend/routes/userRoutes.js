const express = require('express');
const router = express.Router()

const {register, login, getOtherUsers} = require('../controllers/userController')
const {isAuthenticated} = require('../middlewares/AuthMiddleware')

router.post("/register",register)
router.post("/login",login)
router.get("/",isAuthenticated,getOtherUsers)

module.exports = router