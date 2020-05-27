const express = require('express')
const controller = require('../controllers/auth.js')
const router = express.Router()

router.post('/login', controller.login)
router.post('/registeradmin', controller.registeradmin)

module.exports = router