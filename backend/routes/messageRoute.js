const express = require('express');
const router = express.Router()
const {sendMessage,getMessage} = require('../controllers/messageController')
const {isAuthenticated} = require('../middlewares/AuthMiddleware')

router.post("/send/:id",isAuthenticated,sendMessage)
router.get("/:id",isAuthenticated,getMessage)
module.exports = router;