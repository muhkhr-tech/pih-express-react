const express = require('express')

const router = express.Router()

const menuController = require('../controllers/MenuController')

router.get('/menus', menuController.findMenus)
router.post('/menus', menuController.createMenu)
router.put('/menus/:id', menuController.updateMenu)
router.delete('/menus/:id', menuController.deleteMenu)

module.exports = router