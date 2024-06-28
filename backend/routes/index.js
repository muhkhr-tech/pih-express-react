const express = require('express')

const router = express.Router()

const menuAdminController = require('../controllers/admin/MenuController')
const menuController = require('../controllers/menus/MenuController')

router.get('/admin/menus', menuAdminController.findMenus)
router.get('/admin/menus/:id', menuAdminController.findMenuById)
router.post('/admin/menus', menuAdminController.createMenu)
router.put('/admin/menus/:id', menuAdminController.updateMenu)
router.put('/admin/menus/:id/change-status', menuAdminController.changeStatusMenu)
router.delete('/admin/menus/:id', menuAdminController.deleteMenu)

router.get('/menus', menuController.findMenus)

module.exports = router