const express = require('express')

const router = express.Router()

const menuAdminController = require('../controllers/admin/MenuController')
const menuController = require('../controllers/menus/MenuController')
const saleController = require('../controllers/sales/SaleController')
const materialController = require('../controllers/materials/MaterialController')
const materialAdminController = require('../controllers/admin/MaterialConstroller')
const purchaseController = require('../controllers/purchases/PurchaseController')
const customerController = require('../controllers/customers/CustomerController')
const storeController = require('../controllers/stores/StoreController')
const loginController = require('../controllers/auth/LoginController')
const { validatePurchase } = require('../utils/validators/purchase')
const { validateSale } = require('../utils/validators/sale')
const { validateMenu } = require('../utils/validators/menu')
const upload = require('../utils/upload')
const verifyToken = require('../middleware/auth')
const { validateLogin } = require('../utils/validators/auth')

router.get('/admin/menus', verifyToken, menuAdminController.findMenus)
router.get('/admin/menus/:id', menuAdminController.findMenuById)
router.post('/admin/menus', validateMenu, menuAdminController.createMenu)
router.put('/admin/menus/:id', menuAdminController.updateMenu)
router.put('/admin/menus/:id/change-status', menuAdminController.changeStatusMenu)
router.post('/admin/menus/:id/upload', upload.single('image'), menuAdminController.uploadImageMenu)
router.delete('/admin/menus/:id', menuAdminController.deleteMenu)

router.get('/admin/materials', verifyToken, materialAdminController.findMaterials)
router.post('/admin/materials', materialAdminController.createMaterial)
router.put('/admin/materials/:id', materialAdminController.updateMaterial)

router.post('/login', validateLogin, loginController.login)

router.get('/materials', materialController.findMaterials)

router.get('/menus', menuController.findMenus)
router.get('/menus/:id/image', menuController.findImageMenu)

router.get('/sales', saleController.findSales)
router.get('/sales/total', saleController.findTotalSales)
router.get('/sales/:id', saleController.findSaleById)
router.post('/sales', validateSale, saleController.createSale)

router.get('/purchases', purchaseController.findPurchases)
router.get('/purchases/total', purchaseController.findTotalPurchases)
router.get('/purchases/:id', purchaseController.findPurchaseById)
router.post('/purchases', validatePurchase, purchaseController.createPurchase)

router.get('/customers', customerController.findCustomers)
router.get('/customers/:id', customerController.findCustomerById)
router.post('/customers', customerController.createCustomer)

router.get('/stores', storeController.findStores)
router.get('/stores/:id', storeController.findStoreById)
router.post('/stores', storeController.createStore)

module.exports = router