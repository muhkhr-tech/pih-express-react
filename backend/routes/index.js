const express = require('express')

const router = express.Router()

const menuController = require('../controllers/MenuController')

router.get('/menus', menuController.findMenus)
router.post('/menus', menuController.createMenu)

module.exports = router