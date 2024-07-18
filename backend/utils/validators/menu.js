const { body } = require('express-validator')

const validateMenu = [
    body('name').notEmpty().withMessage('Nama menu tidak boleh kosong!'),
    body('price').isNumeric().withMessage('Format harga salah!')
]

module.exports = {
    validateMenu
}