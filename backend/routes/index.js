const express = require('express')

const router = express.Router()

const menuAdminController = require('../controllers/admin/MenuController')
const menuController = require('../controllers/menus/MenuController')
const sellingController = require('../controllers/sellings/SellingController')
const customerController = require('../controllers/customers/CustomerController')

router.get('/admin/menus', menuAdminController.findMenus)
router.get('/admin/menus/:id', menuAdminController.findMenuById)
router.post('/admin/menus', menuAdminController.createMenu)
router.put('/admin/menus/:id', menuAdminController.updateMenu)
router.put('/admin/menus/:id/change-status', menuAdminController.changeStatusMenu)
router.delete('/admin/menus/:id', menuAdminController.deleteMenu)

router.get('/menus', menuController.findMenus)

router.get('/sellings', sellingController.findSellings)
router.post('/sellings', sellingController.createSelling)

router.get('/customers', customerController.findCustomers)
router.post('/customers', customerController.createCustomer)

module.exports = router