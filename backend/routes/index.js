const express = require('express')

const router = express.Router()

const menuAdminController = require('../controllers/admin/MenuController')
const menuController = require('../controllers/menus/MenuController')
const saleController = require('../controllers/sales/SaleController')
const materialController = require('../controllers/materials/MaterialController')
const materialAdminController = require('../controllers/admin/MaterialConstroller')
const purchaseController = require('../controllers/purchases/PurchaseController')
const { validatePurchase } = require('../utils/validators/purchase')
const { validateSale } = require('../utils/validators/sale')

router.get('/admin/menus', menuAdminController.findMenus)
router.get('/admin/menus/:id', menuAdminController.findMenuById)
router.post('/admin/menus', menuAdminController.createMenu)
router.put('/admin/menus/:id', menuAdminController.updateMenu)
router.put('/admin/menus/:id/change-status', menuAdminController.changeStatusMenu)
router.delete('/admin/menus/:id', menuAdminController.deleteMenu)

router.get('/admin/materials', materialAdminController.findMaterials)
router.post('/admin/materials', materialAdminController.createMaterial)

router.get('/materials', materialController.findMaterials)

router.get('/menus', menuController.findMenus)

router.get('/sales', saleController.findSales)
router.post('/sales', validateSale, saleController.createSale)

router.get('/purchases', purchaseController.findPurchases)
router.get('/purchases/:id', purchaseController.findPurchaseById)
router.post('/purchases', validatePurchase, purchaseController.createPurchase)

module.exports = router