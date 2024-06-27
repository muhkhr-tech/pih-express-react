const express = require('express')

const router = express.Router()

const menuController = require('../controllers/MenuController')

router.get('/menu', menuController.findMenu)

module.exports = router